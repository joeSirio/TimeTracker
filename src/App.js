import React from 'react';
import Timer from './Components/Timer/Timer';
import History from './Components/History/History';
import './App.css';
import http from './Services/httpService'
import axios from "axios" 
import helpers from './Tools/helpers'
import moment from 'moment-timezone'

export default class App extends React.Component {
  constructor(props){
    super(props);

    this.state = { 
        timerStartTime: null,
        activeData: {
          id: 0,
          task:"t",
          project: "p",
          tags: [],
          startDate: null,
          duration:0,
          active: false
        },
        historyData: [],
        timezone: moment.tz.guess()
    };
  }

  componentDidMount(){
    this.getActive(1)
    this.getAll(1)
      
  }

  getActive(id){
    axios.get(`http://127.0.0.1:5000/getActive/${id}`)
    .then((response) => {
      console.log(response.data);
      let data = {
        id: response.data["Id"],
        task: response.data["Task"],
        project: response.data["Project"],
        tags: response.data["Tags"],
        startDate: moment.tz(response.data["StartDateTime"], this.state.timezone),
        active: response.data["StartDateTime"] != '' ? true : false,
        duration: response.data["StartDateTime"] != '' ? 
          helpers.getMsFromDates(this.state.activeData.startDate, new Date()) 
          : 0
      }
      this.setState({
        activeData: data
      })
    })
  }

  getAll(id) {
    axios.get(`http://127.0.0.1:5000/get/${id}`)
    .then((response) => {
      let data = response.data.map(record => ({
        id: record["Id"],
        task: record["Task"],
        project: record["Project"],
        tags: record["Tags"],
        startDate: moment.tz(record["StartDateTime"], this.state.timezone),
        endDate: moment.tz(record["EndDateTime"], this.state.timezone),
        durationMs: record["DurationMs"]
      }))
      console.log(data)
      this.setState({
        historyData: data
      })
    })
  }

  newTimeRecord = (data) => {
    let dto = {
      task: data.task,
      project: data.project,
      tags: data.tags,
      startDateTime: data.startDate,
      userId: 1
    } 
    axios.post(`http://127.0.0.1:5000/add`, JSON.stringify(dto), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      const startDate = moment.tz(response.data.StartDateTime, this.state.timezone)
      const duration =  helpers.getMsFromDates(startDate, new Date());
      this.setState({
        activeData: {
          id: response.data.Id,
          task: response.data.Task,
          project: response.data.Project,
          tags: response.data.Tags,
          startDate: startDate,
          duration: duration,
          active: true
        }
      })
    })
    return;
  }

  updateData = (data) => {
    let dto = {
      id: data.id,
      task: data.task,
      project: data.project,
      tags: data.tags,
      startDateTime: data.startDate,
      endDateTime: data.endDate,
      duration: helpers.getMsFromDates(data.startDate, data.endDate),
      userId: 1
    } 
    axios.post(`http://127.0.0.1:5000/update`, JSON.stringify(dto), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      if(response.data.success){
        this.getActive(1)
        this.getAll(1)
      }
      console.log(response)
    })
  }

  updateTimerData = (data) => {
    this.setState(state => ({
      activeData: {
        id: state.activeData.id,
        task: data.field === "task" ? data.value : state.activeData.task,
        project: data.field === "project" ? data.value : state.activeData.project,
        // tags: state.activeData.tags,
        startDate: state.activeData.startDate,
        duration: helpers.getDuration(state.activeData.startDate, new Date()),
        active: state.activeData.active
      }
    }))
  }
  
  render() {
    return (
      <div className='App'>
        {/* <header className='App-header'>
          <h4 className='App-title'>Time Tracker</h4>

          <hr className='Title-seperator'/>
        </header> */}

        <div className='Content'>
          <Timer activeData = {this.state.activeData} updateData = {this.updateData} updateTimerData = {this.updateTimerData} newTimeRecord = {this.newTimeRecord} />
          <History historyData = {this.state.historyData} />
        </div>
      </div>
    )
  }
}