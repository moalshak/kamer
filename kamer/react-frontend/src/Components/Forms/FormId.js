import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CSVLink } from "react-csv";
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
    const [data, setData] = useState('');

    /**
     * This function listens to the click of the button and calls the research or the deletion of a property
     * @param event the listener
     */
    const onSubmit = (event) => {
        event.preventDefault()
        const opt = event.target.name; // option -> delete or find
        onGet(id.trim(), opt)
    }

    const [update, setUpdate] = useState(false);

    useEffect(async () => {
        try {
            const response = await axios.get(`${BASE_URL}id/${id}/?format=csv`);
            console.log(response.data);
            setData(response.data);
            
            // console.log(data);
            /*axios({
                method: 'GET',
                url: `${BASE_URL}id/${id}/?format=csv`,
            }).then((res) => {
                console.log(res.data);
                setData(res.data);room-1686123
            });*/
        } catch (error) {
            console.log(error);
            
            console.log(`${id} does not exist`);
        }
    }, [update]);

    

    /**
     * JSX of the form
     */
    return (
        <form className='form-control' onSubmit={onSubmit}>
            <label>Id</label>
            <input type='text' placeholder='type id' value={id} onChange={(e) => {
                setId(e.target.value)
            }} required={true}/>
            
            <label>Do you want CSV output</label>
            <input type='checkbox' name="csv" onChange={() => setCsvChecked(!csvChecked)}/>
            {/*<a href={`${BASE_URL}id/${id}/?format=csv`}> Download CSV </a>*/}
            <CSVLink onClick={() => {
                setUpdate(true)
                }}
                data={data}
                >
                Download me
            </CSVLink>
            <button onClick={onSubmit} name="find">Find Property</button>
            <button onClick={onSubmit} name="del">Delete Property</button>
        </form>
    )
}

export default FormId;
