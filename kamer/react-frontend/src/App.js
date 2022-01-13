import axios from "axios";
import React from "react";
import ControlPanel from './Components/ControlPanel';
import Property from './Components/Property';
import {useState} from "react";

import InputPanel from './Components/InputPanel';
// import PropertyFeed from './Components/PropertyFeed';
// import InputPanel from './Components/InputPanel';

function App() {
    const baseURL = "https://www.team13.xyz/api/";
    axios.defaults.headers.common['Authorization'] = 'Token ff27fca94c0c9461da6e327389e7b633224cd2fa'

    //properties state
    const [properties, setProperties] = useState([])

    //show forms state
    const [idForm, setIdForm] = useState(false)
    const [locationForm, setLocationForm] = useState(false)
    const [cityForm, setCityForm] = useState(false)
    const [showForm, setShowForm] = useState('')

    const getPropertyById = (id) => {
        console.log(baseURL + "id/" + id + "/?format=json")
        axios.get(baseURL + "id/" + id + "/?format=json")
        .then((response) => {
            let result = response.data;
            let a = []
            a.push(result)
            setProperties(a)
        }).catch((error) => {
            if (error.response) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);
      }
    })
    }

    const onControlPanelClick = (form) => {
        setShowForm(form);
        console.log(form);
    }


    return (
        <div className="bigChungus">
            <ControlPanel 
            onButtonClick={onControlPanelClick}
                />
            <Property properties={properties} setProperties={setProperties}/>
            <InputPanel
            formToShow={showForm}
            onIdGet={getPropertyById}
            /> 
            {/*{idForm && <FormId onGet={getPropertyById} />}
            <PropertyFeed/>*/}
        </div>
    );
}

export default App;
