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

    //properties state
    // `getProperties` will "watch" the `currUrl` and update whenever it (currUrl) changes
    const [properties, setProperties] = useState([])
    /* state for the navigation */
    const [nav, setNav] = useState(true);

    //show forms state
    const [idForm, setIdForm] = useState(false)
    const [locationForm, setLocationForm] = useState(false)
    const [cityForm, setCityForm] = useState(false)
    const [showForm, setShowForm] = useState('')

    /***/
    const onControlPanelClick = async (form) => {
        /* the form is undefined whenever the `search by all` is clicked */
        if (form === undefined) {
            const {data, next, prev} = await getProperties(`${BASE_URL}all/?format=json&page=1`);
            setProperties(data);
            setNav(true);
        } else {
            setShowForm(form);
        }
    }

    /**
     * search by id is clicked
     * */
    const onIdGet = async (id) => {
        const {data, next, prev} = await getProperties(`${BASE_URL}id/${id}/?format=json`);
        setProperties(data);
        setNav(false);
    }


    return (
        <div className="bigChungus">
            <ControlPanel 
            onButtonClick={onControlPanelClick}
                />
            <Property
                properties={properties} setProperties={setProperties}
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
