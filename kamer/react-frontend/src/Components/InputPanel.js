import React from "react";
import FormId from './Forms/FormId';
import FormLongLat from './Forms/FormLongLat';
import FormCity from './Forms/FormCity';
import FormPost from "./Forms/FormPost";
import FormStats from "./Forms/FormStats";
import FormPutId from "./Forms/FormPutId";

function InputPanel({formToShow, onIdGet, onLocationGet, onCityPrefGet, onCityStatsGet, onPropertyPost, onIdPut}){
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
            {formToShow === 'location' && <FormLongLat onGet = {onLocationGet} />}
            {formToShow === 'cityPref' && <FormCity onGet = {onCityPrefGet}/>}
            {formToShow === 'stats' && <FormStats onGet = {onCityStatsGet}/>}
            {formToShow === 'addProp' && <FormPost onGet = {onPropertyPost} />}
            {formToShow === 'editId' && <FormPutId onGet = {FormPutId} />}
        </div>
    )
}

export default InputPanel;