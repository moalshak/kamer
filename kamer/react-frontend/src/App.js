import axios from "axios";
import React, {useState} from "react";
import ControlPanel from './Components/ControlPanel';
import Property from './Components/Property';
import InputPanel from './Components/InputPanel';
// import PropertyFeed from './Components/PropertyFeed';
// import InputPanel from './Components/InputPanel';

const BASE_URL = "https://www.team13.xyz/api/";

function App() {

    axios.defaults.headers.common['Authorization'] = 'Token ff27fca94c0c9461da6e327389e7b633224cd2fa'

    /* state for the navigation
    * `nav` is an object (hashMap / dictionary) that contains info about the navigation
    *  */
    const [nav, setNav] = useState({
        curr: `${BASE_URL}all/?format=json&page=1`,
        next: '',
        prev: '',
        count: '',
    });

    //show forms state
    const [showForm, setShowForm] = useState('')

    /***/
    const onControlPanelClick = async (form) => {
        /* the form is undefined whenever the `search by all` is clicked */
        if (form === undefined) {
            const curr = `${BASE_URL}all/?format=json&page=1`;
            setNav({
                ...nav,
                curr: curr,
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
            curr: curr,
        });
    }

    const onLocationGet = async (lat, long) => {
        const curr = `${BASE_URL}location/?format=json&latitude=${lat}&longitude=${long}`;
        setNav({
            ...nav,
            curr: curr,
        });
    }

    const onCityPrefGet = async (city = '', orderBy = '', ascOrDesc = '', maxPrice = '', minPrice = '', pets_choice = '', minArea = '', maxArea = '', sqmBudget = '') => {
        // const curr = `${BASE_URL}city/${city}/?format=json&orderBy=${orderBy}&ascOrDesc=${ascOrDesc}&maxPrice=${maxPrice}&minPrice=${minPrice}&pets_choice=${pets_choice}&minArea=${minArea}&maxArea=${maxArea}&sqmBudget=${sqmBudget}`;
        let curr = `${BASE_URL}city/${city}/?format=json`
        if (orderBy !== '') {
            curr += `&orderBy=${orderBy}`;
        }
        if (ascOrDesc !== '') {
            curr += `&ascOrDesc=${ascOrDesc}`;
        }
        if (maxPrice !== '') {
            curr += `&maxPrice=${maxPrice}`;
        }
        if (minPrice !== '') {
            curr += `&minPrice=${minPrice}`;
        }
        if (pets_choice !== '') {
            curr += `&pets=${pets_choice}`
        }
        if (minArea !== '') {
            curr += `&minArea=${minArea}`;
        }
        if (maxArea !== '') {
            curr += `&maxArea=${maxArea}`;
        }
        if (sqmBudget !== '') {
            curr += `&sqmBudget=${sqmBudget}`;
        }
        console.log(curr);
        setNav({
            ...nav,
            curr: curr,
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
                onLocationGet={onLocationGet}
                onCityPrefGet={onCityPrefGet}
            />

            {/*{idForm && <FormId onGet={getPropertyById} />}
            <PropertyFeed/>*/}
        </div>
    );
}


export default App;
