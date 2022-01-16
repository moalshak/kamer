import React, {useState} from 'react'

const FormLongLat = ({onGet}) => {
    const [longitude, setLongitude] = useState('')
    const [latitude, setLatitude] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        onGet(latitude.trim(), longitude.trim())
    }

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
