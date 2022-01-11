import React from "react";
import Button from "./Button";

function ControlPanel() {
    return (
        <div className="controlPanel">
            <Button text="ID"/>
            <Button text="Longitude & Latitude"/>
            <Button text="Preference"/>
        </div>
    )
}

export default ControlPanel;