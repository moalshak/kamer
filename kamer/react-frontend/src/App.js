import axios from "axios";
import React, {useState} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import ControlPanel from "./Components/ControlPanel";
import Property from "./Components/Property";
import delProperty from "./Components/Property";
import InputPanel from "./Components/InputPanel";
import Detail from "./Components/Detail";
import StatsModal from "./Components/StatsModal";

// import PropertyFeed from './Components/PropertyFeed';
// import InputPanel from './Components/InputPanel';

export const BASE_URL = "https://www.team13.xyz/api/";

function App() {

    axios.defaults.headers.common['Authorization'] = 'Token ff27fca94c0c9461da6e327389e7b633224cd2fa'
    const [showModal, setShowModal] = useState(false);
    const [statsModalState, setStatsModalState] = useState({city:"none", rcMean:0, rdMean:0, rcMedian:0, rdMedian:0, rcSd:0, rdSd:0})

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
     * @param id the id of the property
     * @param opt the option
     * */
    const onIdGet = async (id, opt) => {
        const curr = `${BASE_URL}id/${id}/?format=json`;
        if (opt === 'find') {
            setNav({
                ...nav,
                curr: curr,
            });
        } else if (opt === 'del') {
            console.log('Clicked!');
            await delProperty(curr, {});
        }
    }

    const onLocationGet = async (lat, long) => {
        const curr = `${BASE_URL}location/?format=json&latitude=${lat}&longitude=${long}`;
        setNav({
            ...nav,
            curr: curr,
        });
    }

    const onCityStatsGet = async (city) => {
        const url = `${BASE_URL}city/stats/${city}/?format=json`
        const response = await axios.get(url);
        let rcMean = response.data.rcMean;
        let rdMean = response.data.rdMean;
        let rcMedian = response.data.rcMedian;
        let rdMedian = response.data.rdMedian;
        let rcSd = response.data.rcSd;
        let rdSd = response.data.rdSd;
        setStatsModalState({city:city, rcMean: rcMean, rdMean: rdMean, rcMedian: rcMedian, rdMedian: rdMedian, rcSd: rcSd, rdSd: rdSd})
        setShowModal(true);
        console.log(setStatsModalState);
    }

    const onPropertyPost = async (details) => {
        console.log(details)
        const response = await axios.post(`${BASE_URL}all/?format=json`, details);
        
        // const response = await axios.post(`${BASE_URL}all/?format=json`, {
        //     "externalId": "room-1000",
        //     "areaSqm": 14,
        //     "city": "Rotterdam",
        //     "coverImageUrl": "https://resources.kamernet.nl/image/913b4b03-57b2-4821-aae4-7423dca14888",
        //     "furnish": "Unfurnished",
        //     "latitude": "51.8966010000",
        //     "longitude": "4.5149930000",
        //     "postalCode": "3074HN",
        //     "propertyType": "Room",
        //     "rent": 500,
        //     "title": "West-Varkenoordseweg",
        //     "deposit": 500,
        //     "descriptionTranslated": "Nice room for rent, accros the Feyenoord stadium in Rotterdam. It has shared Bathroom and kitchen. There are a few room for rent in the building, so if you maybe like to live with your friends, this is maybe an option. Pls contact us for more information.",
        //     "gender": "Mixed",
        //     "isRoomActive": false,
        //     "pageDescription": "Room for rent in Rotterdam,  West-Varkenoordseweg, for €500 a month. Interested? React now!",
        //     "pageTitle": "Room for rent in Rotterdam €500 | Kamernet",
        //     "pets": "No",
        //     "roommates": "5"
        // });
        console.log(response)

    }

    const onIdPut = async (id, details) => {
        console.log(details)
        const response = await axios.put(`${BASE_URL}id/${id}/?format=json`, details);
    }

    const onCityPrefGet = async (city = '', orderBy = '', ascOrDesc = '', maxPrice = '', minPrice = '', pets_choice = '', minArea = '', maxArea = '', sqmBudget = '') => {
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
        <Router>
            <Routes>
                <Route exact path="/" element={
                    <div className="bigChungus">
                        {showModal && <StatsModal onClose={setShowModal(false)} state={statsModalState} />}
                        <ControlPanel
                            onButtonClick={onControlPanelClick}
                            on
                        />

                        <Property
                            nav={nav} setNav={setNav}
                        />

                        <InputPanel
                            formToShow={showForm}
                            onIdGet={onIdGet}
                            onLocationGet={onLocationGet}
                            onCityPrefGet={onCityPrefGet}
                            onCityStatsGet={onCityStatsGet}
                            onPropertyPost={onPropertyPost}
                        />
                        
                    </div>
                    
                }/>
                <Route exact path="/property/:externalId" element={<Detail/>}/>
            </Routes>
        </Router>
    );
}


export default App;
