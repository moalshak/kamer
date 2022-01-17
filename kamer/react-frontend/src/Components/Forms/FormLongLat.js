import React, {useState} from 'react'

/**
 * This form gets the latitude and longitude of the properties we want to research
 * @param onGet This function gets the properties with the inputted latitude and longitude
 * @return {JSX.Element} the form we want to display
 * @constructor
 */
const FormLongLat = ({onGet}) => {
    const [longitude, setLongitude] = useState('')
    const [latitude, setLatitude] = useState('')
    /**
     * This function listens to the click of the button and calls the research a range of properties
     * @param e the listener
     */
    const onSubmit = (e) => {
        e.preventDefault()
        onGet(latitude.trim(), longitude.trim())
    }
    /**
     *  JSX of the form
     */
    return (
        <form className='form-control' onSubmit={onSubmit}>
            <label>Latitude</label>
            <input type='text' placeholder='type latitude' value={latitude} onChange={(e) => {
                setLatitude(e.target.value)
            }} required={true}/>
            <label>Longitude</label>
            <input type='text' placeholder='type longitude' value={longitude} onChange={(e) => {
                setLongitude(e.target.value)
            }} required={true}/>
            <button type='submit'>Find Property</button>
        </form>
    )
}

export default FormLongLat
