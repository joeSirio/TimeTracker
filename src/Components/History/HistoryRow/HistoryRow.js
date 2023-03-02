import React from 'react';
import helpers from '../../../Tools/helpers';

export default class HistoryRow extends React.Component {
    render() {
        let data = this.props.historyRowData;
        return (
            <div className='history-row'>
                <div className='history-duration'>
                    {helpers.getDurationFromMs(data.durationMs)}
                </div>
                <div className='history-task'>
                    {data.task} 
                </div>
                <div className='history-project'>
                    {data.project}
                </div>
                {/* <div className='history-tags'>
                    {data.tags.map(tag => (
                        <div className='history-tag-item'>
                            {tag}
                        </div>
                    ))}
                </div> */}
                <div className='history-time'>
                    {helpers.convertDateToTime(data.startDate)} - {helpers.convertDateToTime(data.endDate)}
                </div>
            </div>
        );
    }
} 
