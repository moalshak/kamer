import React, { useState } from 'react';
import { BASE_URL } from '../../App';

/**
 * This form gets the id of the property that the user wants to either find or delete
 * @param onGet the function that is going to use the input id to either delete the property
 * @return {JSX.Element}the form that we want to display
 * @constructor
 */
const FormId = ({onGet}) => {
    const [id, setId] = useState('')
    const [csvChecked, setCsvChecked] = useState(false);

    /**
     * This function listens to the click of the button and calls the research or the deletion of a property
     * @param event the listener
     */
    const onSubmit = (event) => {
        event.preventDefault()
        const opt = event.target.name; // option -> delete or find
        onGet(id.trim(), opt)
    }


    /**
     * JSX of the form
     */
    return (
        <form className='form-control' onSubmit={onSubmit}>
            <label>Id</label>
            <input type='text' placeholder='type id' value={id} onChange={(e) => {
                setId(e.target.value)
            }} required={true}/>
            
            <a href={`${BASE_URL}id/${id}/?format=csv`}> Download CSV </a>
        
            <button onClick={onSubmit} name="find">Find Property</button>
            <button onClick={onSubmit} name="del">Delete Property</button>
        </form>
    )
}

export default FormId;
