import React from "react";

function GetByIdBtn() {
    let [id, setId] = React.useState();
    let [button_disabled, setDisabled] = React.useState(true);

    function idChanged(event) {
        setId(event.target.value);
        setDisabled(false);
    }

    function getFromAPI() {
        // todo: implement this
    }

    return (
        <div className="GetByIdBtn">
            <h1>Get by id</h1>
            <label htmlFor="idProperty">Insert the ID of the property: </label>
            <input id="idProperty" placeholder="ID of the property" value={id} onChange={idChanged}/>
            <button onClick={getFromAPI} disabled={button_disabled}>Search for {id}</button>
        </div>
    );
}

export default GetByIdBtn;