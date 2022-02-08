import React from "react";

/**
 * Stats pop up component displaying statistical info about a given city
 *
 * @param onClose Checks to see if the pop-up component should be closed
 * @param State the data containing statistical information about a city
 * @return the pop up component that will be displayed
 */
function StatsModal({onClose, state}){

    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">Statistics for {state.city}</h4>
                </div>
                <div className="modal-body">
                    This is the statistics for {state.city}.
                    <ul>
                        <li>Rental cost mean: {state.rcMean} </li>
                        <li>Rental deposit mean: {state.rdMean} </li>
                        <li>Rental cost median: {state.rcMedian} </li>
                        <li>Rental deposit median: {state.rdMedian} </li>
                        <li>Rental cost standard deviation: {state.rcSd} </li>
                        <li>Rental deposit standard deviation: {state.rdSd} </li>
                    </ul>
                </div>
                <div className="modal-footer">
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default StatsModal;