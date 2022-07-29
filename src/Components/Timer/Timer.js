import React from 'react';
import Ticker from './Ticker/Ticker';
import './Timer.css';

export default class Timer extends React.Component {
    constructor(props){
        super(props);

        this.state = { 
            timerToggleText: 'START',
            timerActive: false,
            timerStartTime: null,
            taskText: "",
            projectText: "",
            tags: [],
            showTagEditor: false
        };

        this.timerToggle = this.timerToggle.bind(this);
        this.addTag = this.addTag.bind(this);
        this.showTagEditor = this.showTagEditor.bind(this);
    }

    timerToggle(e) {
        let className = e.currentTarget.className;
        
        if(className === "Timer-toggle Active"){
            e.currentTarget.className='Timer-toggle Inactive';

            var endDateTime = new Date();

            this.props.updateData({
                startDate: this.state.timerStartTime, 
                startTime: this.state.timerStartTime.getTime(), 
                endDate: endDateTime,
                endTime: endDateTime.getTime(),
                taskText: this.state.taskText,
                projectText: this.state.projectText,
                tags: this.state.tags
            })

            this.setState({
                timerToggleText: "START", 
                timerActive: false, 
                timerStartTime: null,
                taskText: "",
                projectText: "",
                tags: []
            });
             
            return;
        }
        
        e.currentTarget.className='Timer-toggle Active';
        this.setState({timerToggleText: "STOP", timerActive: true, timerStartTime: new Date() });
    }

    addTag(e){
        var text = document.getElementById('TimerTagInput').value.trim();
        
        if(this.state.tags.indexOf(text) !== -1){
            alert("Tag Already Exists!")
            return;
        }        

        if(text.length === 0){
            alert("Please type a tag name")
            return;
        }

        this.setState(state => ({
            tags: [...state.tags, text],
            showTagEditor: false
        }))
    }

    showTagEditor(e){
        this.setState({
            showTagEditor: true
        })
        document.getElementById('TimerTagInput').focus(); //NOT WORKING
    }

    render() {
        const tagInput = <div className='Timer-tags'><input id='TimerTagInput' className='Timer-tag-input' placeholder='Add A Tag' /></div>;
        const tagInputButton =  <button className='add-tag-button' onClick={this.addTag}>Add</button>;
        const tagList = 
            <div className='Timer-tags'>
                {this.state.tags.map(tag => (
                    <div className='timer-tag' key={tag}>{tag}</div>
                ))}
            </div>;
        const tagListButton = <button className='add-tag-button' onClick={this.showTagEditor}>+</button>;

        return (
            <div className='Timer'>
                <input className='Timer-text' placeholder='Task' value={this.state.taskText} onChange={e => this.setState({taskText: e.target.value})} />
                <input className='Timer-project' placeholder='Project' value={this.state.projectText} onChange={e => this.setState({projectText: e.target.value})}  />

                {(this.state.tags.length > 0 && !this.state.showTagEditor) ? 
                    tagList
                    : tagInput
                } 

                {(this.state.tags.length > 0 && !this.state.showTagEditor) ? 
                    tagListButton
                    : tagInputButton
                }                               

                <div id="Clock" className='Timer-clock'>
                    {this.state.timerActive && <Ticker />} 
                    {!this.state.timerActive && '00:00'}
                </div>

                <div className={['Timer-toggle', 'Inactive'].join(" ")} onClick={this.timerToggle}>
                    {this.state.timerToggleText}
                </div>
            </div>
        );
    }
} 
