import React from 'react';
import PropTypes from 'prop-types';
import helpers from '../../Tools/helpers';
import HistoryRow from './HistoryRow/HistoryRow';
import './History.css';

export default class History extends React.Component {    
    render() {
        if(this.props.historyData.length <= 0 || this.props.historyData.length === null)
            return(
                <div className='history-table'>
                    <h3>No History</h3>
                </div>
            )
        
        let groupedData = helpers.groupAndSortHistoryData(this.props.historyData, "endDate")

        return (
            <div className='history-table'>
                <h2 className='history-title'>History</h2>
                {groupedData.map(([date, dataGroup], index) => (
                    <div className='history-group' key={index}>
                        <h3>{new Date(date).toLocaleDateString()}</h3>
                        <div className='history-row-labels'>
                            <div className='history-duration'>
                                Duration
                            </div>
                            <div className='history-task'>
                                Task
                            </div>
                            <div className='history-project'>
                                Project
                            </div>
                            {/* <div className='history-tags'>
                                Tags
                            </div> */}
                            <div className='history-time'>
                                Start / End
                            </div>
                        </div>

                        {dataGroup.map(historyRow => (
                            <HistoryRow historyRowData = {historyRow} key={historyRow.key} />
                        ))}
                    </div>
                ))}
            </div>
        )
    }
} 

History.propTypes = {
    historyData: PropTypes.array.isRequired
}