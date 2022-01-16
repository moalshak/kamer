import React, {useState} from 'react';

const FormStats = ({onGet}) => {
    const [city, setCity] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        onGet(city.trim())
    }

    return (
        <form className='form-control' onSubmit={onSubmit}>
            <label>City</label>
            <input type='text' placeholder='City for which you want statistics' value={city} onChange={(e) => {
                setCity(e.target.value)
            }} required={true}/>
            <button type='submit'>Find Property</button>
        </form>
    )
}

export default FormStats;