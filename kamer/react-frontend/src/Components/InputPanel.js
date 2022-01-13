import React from "react";
import FormId from './Forms/FormId';
import FormLongLat from './Forms/FormLongLat';
import FormCity from './Forms/FormCity';

function InputPanel({formToShow, onIdGet}){
    
    return (
        <div>
            {formToShow === 'id' && <FormId onGet = {onIdGet} />}
            {formToShow === 'location' && <FormLongLat />}
            {formToShow === 'cityPref' && <FormCity />}
        </div>
    )
}

export default InputPanel;