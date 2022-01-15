import axios from "axios";
import React from "react";
import ControlPanel from './Components/ControlPanel';
import Property, {getProperties} from './Components/Property';
import {useState} from "react";
import InputPanel from './Components/InputPanel';
// import PropertyFeed from './Components/PropertyFeed';
// import InputPanel from './Components/InputPanel';

const BASE_URL = "https://www.team13.xyz/api/";

function App() {

    axios.defaults.headers.common['Authorization'] = 'Token ff27fca94c0c9461da6e327389e7b633224cd2fa'

    /* state for the navigation */
    const [nav, setNav] = useState({
        curr : `${BASE_URL}all/?format=json&page=1`,
        next : '',
        prev : '',
    });

    //show forms state
    const [idForm, setIdForm] = useState(false)
    const [locationForm, setLocationForm] = useState(false)
    const [cityForm, setCityForm] = useState(false)
    const [showForm, setShowForm] = useState('')

    /***/
    const onControlPanelClick = async (form) => {
        /* the form is undefined whenever the `search by all` is clicked */
        if (form === undefined) {
            const curr = `${BASE_URL}all/?format=json&page=1`;
            setNav({
                ...nav,
                curr : curr,
            });
        } else {
            setShowForm(form);
        }
    }

    /**
     * search by id is clicked
     * */
    const onIdGet = async (id) => {
        const curr = `${BASE_URL}id/${id}/?format=json`;
        setNav({
            ...nav,
            curr : curr,
        });
    }


    return (
        <div className="bigChungus">
            <ControlPanel 
            onButtonClick={onControlPanelClick}
                />
            <Property
                nav={nav} setNav={setNav}
            />
            <InputPanel
            formToShow={showForm}
            onIdGet={onIdGet}
            /> 
            {/*{idForm && <FormId onGet={getPropertyById} />}
            <PropertyFeed/>*/}
        </div>
    );
}


export default App;
