import React from "react";
import FormId from './Forms/FormId';
import FormLongLat from './Forms/FormLongLat';
import FormCity from './Forms/FormCity';
import FormPost from "./Forms/FormPost";
import FormStats from "./Forms/FormStats";
import FormLocPut from  "./Forms/FormLocPut"

/**
 * Input Panel component
 * */
function InputPanel({formToShow, onIdGet, onLocationGet, onCityPrefGet, onCityStatsGet, onPropertyPost, onIdPut, onLocationPut}){
    if (formToShow === '') {
        return (
            <div className="inputPanel">
                <p>Click on a button from the left to start searching</p>
            </div>
        );
    }
    return (
        //assigns the following buttons the appropriate forms to be displayed when clicked
        <div className="inputPanel">
            {formToShow === 'id' && <FormId onGet = {onIdGet} />}
            {formToShow === 'location' && <FormLongLat onGet = {onLocationGet} />}
            {formToShow === 'cityPref' && <FormCity onGet = {onCityPrefGet}/>}
            {formToShow === 'stats' && <FormStats onGet = {onCityStatsGet}/>}
            {formToShow === 'addProp' && <FormPost onGet = {onPropertyPost} />}
            {formToShow === 'editId' && <FormPost onGet = {onIdPut} />}
            {formToShow === 'editLoc' && <FormLocPut onGet = {onLocationPut} />}


        </div>
    )
}

export default InputPanel;