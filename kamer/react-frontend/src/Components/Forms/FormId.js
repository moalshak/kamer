import React, {useState} from 'react';

const FormId = ({onGet}) => {
    const [id, setId] = useState('')

    const onSubmit = (event) => {
        event.preventDefault()
        const opt = event.target.name; // option -> delete or find
        onGet(id.trim(), opt)
    }

    return (
        <form className='form-control' onSubmit={onSubmit}>
            <label>Id</label>
            <input type='text' placeholder='type id' value={id} onChange={(e) => {
                setId(e.target.value)
                console.log(id)
            }} required={true}/>
            <button onClick={onSubmit} name="find" >Find Property</button>
            <button onClick={onSubmit} name="del" >Delete Property</button>
        </form>
    )
}

export default FormId;
