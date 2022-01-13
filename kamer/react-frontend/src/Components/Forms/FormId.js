import React, { useState } from 'react';

const FormId = ({onGet}) => {
    const [id, setId] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        onGet(id)
    }

    return (
        <form className='form-control' onSubmit={onSubmit}>
            <label>Id</label>
            <input type='text' placeholder='type id' value={id} onChange={(e) =>{
                setId(e.target.value)
                console.log(id)
            }}></input>
            <input type='submit' value='Find Property'></input>
        </form>
    )
}

export default FormId;
