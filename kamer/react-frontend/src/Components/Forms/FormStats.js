import React, { useState } from 'react';
import { BASE_URL } from '../../App';

/**
 * This form gets the name of the city that we want to see the stats of
 * @param onGet the function that display the stats given the city
 * @return {JSX.Element}
 * @constructor
 */
const FormStats = ({onGet}) => {
    const [city, setCity] = useState('')
    /**
     * This function listens to the click of the button and calls onGet
     * @param e the listener
     */
    const onSubmit = (e) => {
        e.preventDefault()
        onGet(city.trim())
    }
    /**
     * JSX of the form
     */
    return (
        <form className='form-control' onSubmit={onSubmit}>
            <label>City</label>
            <input type='text' placeholder='City for which you want statistics' value={city} onChange={(e) => {
                setCity(e.target.value)
            }} required={true}/>
            <a href={`${BASE_URL}city/stats/${city}/?format=csv`}> Download CSV </a>
            <button type='submit'>Find Property</button>
        </form>
    )
}

export default FormStats;