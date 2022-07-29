import React from 'react';
import helpers from '../../../Tools/helpers';

export default class HistoryRow extends React.Component {
    render() {
        let data = this.props.historyRowData;
        return (
            <div className='history-row'>
                <div className='history-duration'>
                    {helpers.getDuration(data.startDate, data.endDate)}
                </div>
                <div className='history-task'>
                    {data.taskText} 
                </div>
                <div className='history-project'>
                    {data.projectText}
                </div>
                <div className='history-tags'>
                    {data.tags.map(tag => (
                        <div className='history-tag-item'>
                            {tag}
                        </div>
                    ))}
                </div>
                <div className='history-time'>
                    {helpers.convertDateToTime(data.startDate)} - {helpers.convertDateToTime(data.endDate)}
                </div>
            </div>
        );
    }
} 
