import React from 'react';
import './Ticker.css';

export default class Ticker extends React.Component {
    constructor(props){
        super(props);
        this.state = { 
            seconds: 0,
            minutes: 0,
            hours: 0 
        };
    }

    componentDidMount() {
        this.timerID = setInterval(
          () => this.tick(),
          1000
        );
      }
    
      componentWillUnmount() {
        clearInterval(this.timerID);
      }
    
      tick() {
        let secondsCount = this.state.seconds;
        let minutesCount = this.state.minutes;
        let hoursCount = this.state.hours;

        if(secondsCount >= 59){
            secondsCount = 0;

            if(minutesCount >= 59){
                hoursCount++;
                minutesCount = 0;
                this.setState({
                    seconds: secondsCount,
                    minutes: minutesCount,
                    hours: hoursCount
                })
                return;
            }
            minutesCount++;
            this.setState({
                seconds: secondsCount,
                minutes: minutesCount
            })
            return;
        }

        secondsCount++;
        this.setState({
            seconds: secondsCount
        });
      }
    
    render() {
        return (
            <div id='Ticker' className='Ticker'>
                {this.state.hours !== 0 && this.state.hours + ':'}{('0' + this.state.minutes).slice(-2)}:{('0' + this.state.seconds).slice(-2)}
            </div>
        );
    }
} 

  
