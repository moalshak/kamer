import React from "react";
import Button from "./Button";

function ControlPanel({onButtonClick}) {
    return (
        <div className="controlPanel">
            <Button text="ALL" />
            <Button text="ID" onButtonClick={onButtonClick} form='id'/>
            <Button text="Longitude & Latitude" onButtonClick={onButtonClick} form='location'/>
            <Button text="Preference" onButtonClick={onButtonClick} form='cityPref'/>
        </div>
    )
}

export default ControlPanel;