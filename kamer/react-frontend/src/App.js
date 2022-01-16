import axios from "axios";
import React, {useState} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import ControlPanel from "./Components/ControlPanel";
import Property, {delProperty, getCityStats, postProperty, putId, putLocation} from "./Components/Property";
import InputPanel from "./Components/InputPanel";
import Detail from "./Components/Routes/Detail";
import StatsModal from "./Components/StatsModal";
import Edit from "./Components/Routes/Edit";
import Page404 from "./Components/Routes/Page404";

// import PropertyFeed from './Components/PropertyFeed';
// import InputPanel from './Components/InputPanel';

export const BASE_URL = "https://www.team13.xyz/api/";

function App() {

    axios.defaults.headers.common['Authorization'] = 'Token ff27fca94c0c9461da6e327389e7b633224cd2fa'
    const [showModal, setShowModal] = useState(false);
    const [statsModalState, setStatsModalState] = useState({
        city: "none",
        rcMean: 0,
        rdMean: 0,
        rcMedian: 0,
        rdMedian: 0,
        rcSd: 0,
        rdSd: 0
    })

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
     * @param opt the option : delete or find
     * */
    const onIdGet = async (id, opt) => {
        if (opt === 'find') {
            const curr = `${BASE_URL}id/${id}/?format=json`;
            setNav({
                ...nav,
                curr: curr,
            });
        } else if (opt === 'del') {
            const curr = `${BASE_URL}id/${id}/`;
            await delProperty(curr, {});
        }
    }

    /**
     * location query
     * @param lat the latitude
     * @param long the longitude
     * */
    const onLocationGet = async (lat, long) => {
        const curr = `${BASE_URL}location/?format=json&latitude=${lat}&longitude=${long}`;
        setNav({
            ...nav,
            curr: curr,
        });
    }

    /**
     * City stats
     *
     * @param city the city call the api for
     * */
    const onCityStatsGet = async (city) => {
        const data = await getCityStats(city);
        if (data != null) {
            setStatsModalState(data);
        } else {
            setStatsModalState({city: "City not found"});
        }
        setShowModal(true);
    }

    
    const onPropertyPost = async (details) => {
        await postProperty(`${BASE_URL}all/?format=json`, details)
    }

    const onIdPut = async (details) => {
        await putId(`${BASE_URL}id/${details["externalId"]}/?format=json`, details)
    }

    const onLocationPut = async (details) => {
        await putLocation(`${BASE_URL}location/?format=json&latitude=${details["latitude"]}&longitude=${details["longitude"]}`, details);
    }

    /**
     * Fetches the properties from the api and updates the UI
     *
     * @param pref an object that contains preferences
     */
    const onCityPrefGet = async (pref) => {
        let curr = `${BASE_URL}city/${pref.city}/?format=json`
        if (pref.orderBy !== '') {
            curr += `&orderBy=${pref.orderBy}`;
        }
        if (pref.ascOrDesc !== '') {
            curr += `&ascOrDesc=${pref.ascOrDesc}`;
        }
        if (pref.maxPrice !== '') {
            curr += `&maxPrice=${pref.maxPrice}`;
        }
        if (pref.minPrice !== '') {
            curr += `&minPrice=${pref.minPrice}`;
        }
        if (pref.pets_choice !== '') {
            curr += `&pets=${pref.pets_choice}`
        }
        if (pref.minArea !== '') {
            curr += `&minArea=${pref.minArea}`;
        }
        if (pref.maxArea !== '') {
            curr += `&maxArea=${pref.maxArea}`;
        }
        if (pref.sqmBudget !== '') {
            curr += `&sqmBudget=${pref.sqmBudget}`;
        }
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
                        {showModal && <StatsModal onClose={() => {
                            setShowModal(false)
                        }} state={statsModalState}/>}
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
                            onIdPut={onIdPut}
                            onLocationPut={onLocationPut}
                        />

                    </div>

                }/>
                <Route exact path="/property/:externalId" element={<Detail/>}/>
                <Route exact path="/edit/:externalId" element={<Edit onGet={onIdPut}/>}/>
                <Route path="/*" element={<Page404/>}/>
            </Routes>
        </Router>
    );
}


export default App;
