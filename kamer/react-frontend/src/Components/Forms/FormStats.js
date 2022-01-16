import React, {useState} from 'react';

const FormStats = ({onGet}) => {
    const [city, setCity] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        onGet(id.trim())
    }

    return (
        <form className='form-control' onSubmit={onSubmit}>
            <label>City</label>
            <input type='text' placeholder='City for which you want statistics' value={id} onChange={(e) => {
                setCity(e.target.value)
                console.log(city)
            }} required={true}/>
            <input type='submit' value='Find Property'/>
        </form>
    )
}

export default FormStats;