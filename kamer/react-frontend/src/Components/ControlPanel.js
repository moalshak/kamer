import React from "react";
import Button from "./Button";

function ControlPanel({onButtonClick}) {
    return (
        <div className="controlPanel">
            <Button text="View All Properties" onButtonClick={onButtonClick} />
            <Button text="Retrieve or Delete By ID" onButtonClick={onButtonClick} form='id'/>
            <Button text="Search By Longitude & Latitude" onButtonClick={onButtonClick} form='location'/>
            <Button text="Search By Preference" onButtonClick={onButtonClick} form='cityPref'/>
            <Button text="City Statistics" onButtonClick={onButtonClick} form='stats'/>
            <Button text="Add A Property" onButtonClick={onButtonClick} form='addProp'/>
            <Button text="Edit By Property ID" onButtonClick={onButtonClick} form='editId'/>
            <Button text="Edit By Location" onButtonClick={onButtonClick} form='editLoc'/>

        </div>
    )
}

export default ControlPanel;