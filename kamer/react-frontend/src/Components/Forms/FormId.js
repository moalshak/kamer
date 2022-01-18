import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { CSVLink } from "react-csv";
import { BASE_URL } from '../../App';

const FormId = ({onGet}) => {
    const [id, setId] = useState('')
    const [csvChecked, setCsvChecked] = useState(false);
    const [data, setData] = useState('');

    const onSubmit = (event) => {
        event.preventDefault()
        const opt = event.target.name; // option -> delete or find
        onGet(id.trim(), opt , csvChecked)
    }

    useEffect(async () => {
        if(id != ''){
            try {
                const response = await axios.get(`${BASE_URL}id/${id}/?format=csv`);
                setData(response.data);
                console.log(data);
                /*axios({
                    method: 'GET',
                    url: `${BASE_URL}id/${id}/?format=csv`,
                }).then((res) => {
                    console.log(res.data);
                    setData(res.data);
                });*/
            } catch (error) {
                console.log(`${id} does not exist`);
            }
            
        }
    }, [csvChecked])

    return (
        <form className='form-control' onSubmit={onSubmit}>
            <label>Id</label>
            <input type='text' placeholder='type id' value={id} onChange={(e) => {
                setId(e.target.value)
            }} required={true}/>
            
            <label>Do you want CSV output</label>
            <input type='checkbox' name="csv" onChange={() => setCsvChecked(!csvChecked)}/>
            {/*<a href={`${BASE_URL}id/${id}/?format=csv`}> Download CSV </a>*/}
            {csvChecked && <CSVLink
                data={data}
                >
                Download me
            </CSVLink>}
            <button onClick={onSubmit} name="find">Find Property</button>
            <button onClick={onSubmit} name="del">Delete Property</button>
        </form>
    )
}

export default FormId;
