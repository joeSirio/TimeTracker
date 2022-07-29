import React from 'react';
import Timer from './Components/Timer/Timer';
import History from './Components/History/History';
import './App.css';

export default class App extends React.Component {
  constructor(props){
    super(props);

    const tempData = [{
        startDate: "Wed Jul 20 2022 05:47:17 GMT-0400 (Eastern Daylight Time)",
        endDate: "Wed Jul 20 2022 11:42:10 GMT-0400 (Eastern Daylight Time)",
        tags: ["tag 1", "tag 2"],
        key: 1,
        projectText: "Project 1",
        taskText: "Test 1"
      },
      {
        startDate:"Thr Jul 21 2022 12:41:11 GMT-0400 (Eastern Daylight Time)",
        endDate: "Thr Jul 21 2022 15:47:10 GMT-0400 (Eastern Daylight Time)",
        tags: ["tag 2", "tag 3"],
        key: 2,
        projectText: "Project 2",
        taskText: "Test 2"
      },
      {
        startDate: "Wed Jul 20 2022 11:47:15 GMT-0400 (Eastern Daylight Time)",
        endDate: "Wed Jul 20 2022 23:11:10 GMT-0400 (Eastern Daylight Time)",
        tags: ["tag 3", "tag 4"],
        key: 3,
        projectText: "Project 3",
        taskText: "Test 3"
      },
    ];

    this.state = { 
        timerStartTime: null,
        historyData: tempData
    };
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
          <Timer updateData = {this.updateData} />
          <History historyData = {this.state.historyData} />
        </div>
      </div>
    )
  }
}