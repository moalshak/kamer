import React from "react";
import FormId from './Forms/FormId';
import FormLongLat from './Forms/FormLongLat';
import FormCity from './Forms/FormCity';

function InputPanel({formToShow, onIdGet}){
    if (formToShow === '') {
        return (
            <div className="inputPanel">
                <p>Click on a button from the left to start searching</p>
            </div>
        );
    }
    return (
        <div className="inputPanel">
            {formToShow === 'id' && <FormId onGet = {onIdGet} />}
            {formToShow === 'location' && <FormLongLat />}
            {formToShow === 'cityPref' && <FormCity />}
        </div>
    )
}

export default InputPanel;