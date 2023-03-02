import React from 'react';
import helpers from '../../Tools/helpers';
import Ticker from './Ticker/Ticker';
import './Timer.css';

export default class Timer extends React.Component {
    constructor(props){
        super(props);

        this.state = { 
            showTagEditor: false
        };

        this.timerToggle = this.timerToggle.bind(this);
        this.addTag = this.addTag.bind(this);
        this.showTagEditor = this.showTagEditor.bind(this);
    }

    setTimerData(){
        const data = this.props.activeData;
        if(data !== null){
            this.setState({
                timerActive: true,
                timerStartTime: helpers.convertDateToTime(data.startDate),
                taskText: data.task,
                projectText: data.project,
                tags: data.tags
            })
        }
    }

    timerToggle(e) {
        let className = e.currentTarget.className;
        const data = this.props.activeData;

        if(className === "Timer-toggle Active"){
            var endDateTime = new Date();

            this.props.updateData({
                id: data.id,
                startDate: data.startDate, 
                endDate: endDateTime,
                task: data.task ?? "",
                project: data.project ?? "",
                tags: data.tags,
                userId: data.userId
            })
            return;
        }
        
        let startDate = new Date();
        this.props.newTimeRecord({
            startDate: startDate, 
            task: data.task ?? "",
            project: data.project ?? "",
            tags: data.tags
        })
    }

    addTag(e){
        var text = document.getElementById('TimerTagInput').value.trim();
        
        // if(this.state.tags.indexOf(text) !== -1){
        //     alert("Tag Already Exists!")
        //     return;
        // }        

        if(text.length === 0){
            alert("Please type a tag name")
            return;
        }

        this.setState(state => ({
            // tags: [...state.tags, text],
            showTagEditor: false
        }))
    }

    showTagEditor(e){
        this.setState({
            showTagEditor: true
        })
        document.getElementById('TimerTagInput').focus(); //NOT WORKING
    }

    updateTimer(e){
        this.props.updateTimerData({
            field: e.target.dataset['field'],
            value: e.target.value
        })
    }

    render() {
        // const tagInput = <div className='Timer-tags'><input id='TimerTagInput' className='Timer-tag-input' placeholder='Add A Tag' /></div>;
        // const tagInputButton =  <button className='add-tag-button' onClick={this.addTag}>Add</button>;
        // const tagList = 
        //     <div className='Timer-tags'>
        //         {this.props.activeData.tags.map(tag => (
        //             <div className='timer-tag' key={tag}>{tag}</div>
        //         ))}
        //     </div>;
        // const tagListButton = <button className='add-tag-button' onClick={this.showTagEditor}>+</button>;
        return (
            <div className='Timer'>
                <input className='Timer-text' placeholder='Add A Task' value={this.props.activeData.task} onChange={e => this.updateTimer(e)} data-field="task" />
                <input className='Timer-project' placeholder='Add A Project' value={this.props.activeData.project} onChange={e => this.updateTimer(e)} data-field="project"  />

                {/* {(this.props.activeData.tags.length > 0 && !this.state.showTagEditor) ? 
                    tagList
                    : tagInput
                }  */}

                {/* {(this.props.activeData.tags.length > 0 && !this.state.showTagEditor) ? 
                    tagListButton
                    : tagInputButton
                }                                */}

                <div id="Clock" className='Timer-clock'>
                    {this.props.activeData.active && <Ticker duration={this.props.activeData.duration} />} 
                    {!this.props.activeData.active && '00:00'}
                </div>

                <div className={['Timer-toggle', this.props.activeData.active ? 'Active' : 'Inactive'].join(" ")} onClick={this.timerToggle}>
                    {this.props.activeData.active ? "Stop" : "Start"}
                </div>

                {/* {this.props.activeData.active ?
                    <div className={['Timer-toggle', 'Active'].join(" ")} onClick={this.timerToggle}>
                        {this.state.timerToggleText}
                    </div>
                    : 
                    <div className={['Timer-toggle', 'Inactive'].join(" ")} onClick={this.timerToggle}>
                        {this.state.timerToggleText}
                    </div>
                } */}
                
            </div>
        );
    }
} 
