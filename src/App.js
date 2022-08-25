import React from 'react';
import Timer from './Components/Timer/Timer';
import History from './Components/History/History';
import './App.css';
import http from './Services/httpService'
import axios from "axios" 

export default class App extends React.Component {
  constructor(props){
    super(props);

    this.state = { 
        timerStartTime: null,
        activeData: {
          id: 0,
          task:"t",
          project: "p",
          tags: "",
          startDate: "",
        },
        historyData: []
    };

    this.getActive(1)
    this.getAll(1)
  }

  getActive(id){
    axios.get(`http://127.0.0.1:5000/getActive/${id}`)
    .then((response) => {
      let data = {
        id: response.data["Id"],
        task: response.data["Task"],
        project: response.data["Project"],
        tags: response.data["Tags"],
        startDate: response.data["StartDateTime"]
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
        startDate: record["StartDateTime"],
        endDate: record["EndDateTime"],
        durationMs: record["DurationMs"]
      }))
      this.setState({
        historyData: data
      })
    })
  }

  updateData = (data) => {
    this.setState(state => ({
      historyData: [...state.historyData, {
        key:state.historyData.length + 1, 
        startDate: data.startDate,
        startTime: data.startTime,
        endDate: data.endDate, 
        endTime: data.endTime,
        taskText: data.taskText,
        projectText: data.projectText,
        tags: data.tags
      }]
    }))
  }
  
  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <h4 className='App-title'>Time Tracker</h4>

          <hr className='Title-seperator'/>
        </header>

        <div className='Content'>
          <Timer activeData = {this.state.activeData} updateData = {this.updateData} />
          <History historyData = {this.state.historyData} />
        </div>
      </div>
    )
  }
}