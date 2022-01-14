import axios from 'axios';
import {useEffect, useState} from "react";
import MapBuilder from './MapBuilder';


const BASE_URL = "https://www.team13.xyz/api/";

/**
 * Calls the API through a get method
 * 
 * @returns a list of a list fetched from the API at a certain page
 */

function Property ({ properties, setProperties, nav, setNav}) {
    /* state for loading : if the api call is still getting processed */
    const [loading, setLoading] = useState(true);
    
    /* state for the url */
    const [currUrl, setCurrUrl] = useState(`${BASE_URL}all/?format=json&page=1`)
    const [nextUrl, setNextUrl] = useState(null)
    const [prevUrl, setPrevUrl] = useState(null)
    
    /* state for the current page number the user is on */
    const [curPage, setCurPage] = useState(1);

    // `getProperties` will "watch" the `currUrl` and update whenever it (currUrl) changes
    useEffect(() => {
        setLoading(true);
        getProperties();
    }, [currUrl])

    /**
     * fetched the properties from the api call
     */
    const getProperties = async () => {
        try {
            const response = await axios.get(currUrl);
            const next = await response.data.next;
            const prev = await response.data.previous;
            setPrevUrl(prev);
            setNextUrl(next);
            setNav(true);
            const data = await response.data.results;
            setProperties(data);
            setLoading(false); // data is fetched no longer loading
        } catch(error) {
            console.log(error);
        }
    }

    /**
     * requests data from the next/prev page of the API.. PAGINATION 😎
     */
    function nextPage() {
        if (nextUrl != null) {
            setCurrUrl(nextUrl);
            setCurPage((curPage) => curPage + 1);
        }
    }
    function prevPage() {
        if (prevUrl != null) {
            setCurrUrl(prevUrl);
            setCurPage((curPage) => curPage - 1);
        }
    }
    
    /**
     * Retrieves the page number from the url
     */
    function getPageNumber(place) {
        switch (place) {
            case 'next':
                return curPage + 1;
            case 'current':
                return curPage;
            case 'prev':
                if (curPage - 1  > 0) {
                    return curPage - 1;
                } else {
                    return null;
                }
            default:
                return curPage;
        }   
    }

    /**
     * Navigation component
     * */
    function Navigation () {
        if (!nav) {
            return null;
        }
        return (
            <div className="nav">
                    <small>Current Page: {getPageNumber('current')} </small>
                    <br/>
                    <small>Next Page: {getPageNumber('next')} </small>
                    <br/>
                    <small>Previous Page: {getPageNumber('prev')} </small>
                    <div className="NextPrevBtn">
                        <button onClick={prevPage}>Previous Page</button>
                        <button onClick={nextPage}>Next Page</button>
                    </div>
            </div>
        );
    }

    /**
     * list of the description of the properties
     * */
    function Desc() {
        return (
            properties.map((prop) => {
                return (
                    <div className='propDiv'>
                            <li key={prop.externalId}><h2>{prop.externalId}</h2></li>
                            <ul>
                            <li><h3>{prop.title}</h3></li>
                            <li> <img src={prop.coverImageUrl}/></li>
                            <li>AreaSqm: {prop.areaSqm} </li>
                            <li>City: {prop.city} </li>
                            <li>Furnish: {prop.furnish} </li>
                            <li>Latitude: {prop.latitude} </li>
                            <li>Longitude: {prop.longitude} </li>
                            <li>PostalCode: {prop.postalCode} </li>
                            <li>PropertyType: {prop.propertyType} </li>
                            <li>Rent: {prop.rent} </li>
                            <li>AdditionalCost: {prop.additionalCost} </li>
                            <li>Deposit: {prop.deposit} </li>
                            <li>DescriptionTranslated: {prop.descriptionTranslated} </li>
                            <li>Gender: {prop.gender} </li>
                            <li>IsRoomActive: {prop.isRoomActive} </li>
                            <li>PageDescription: {prop.pageDescription} </li>
                            <li>PageTitle: {prop.pageTitle} </li>
                            <li>Pets: {prop.pets} </li>
                            <li>Roommates: {prop.roommates} </li>
                                {/* FIXME: NOTE::: I have disabled the maps since at sometimes the Google api will refuse to give
                                    a response for some reason and that would crash the whole UI... maybe a genuine api will fix it ?
                                I got this error :
                                There has been an Error with loading Google Maps API script, please check that you provided correct google API key (AIzaSyBppjwBEh_iphL_o7XPFaVtRq02tL5Gzfc) or Client ID (-) to <LoadScript />
                                Otherwise it is a Network issue.
                                */}
                        {/*<MapBuilder lng = {prop.longitude} lat={prop.latitude}/>*/}

                            </ul>
                    </div>
                );
            })
        );
    }

    return (
        <div className="container">

            <h3>DATA</h3>

            <Navigation />

            {loading ? <h1>"loading.."</h1> : null} {/* if loading view loading */}

            <ul>
                <Desc/>
            </ul>
        </div>
    )

}

/**
 * fetches the properties from the api at a given url
 *
 * @param url the url to get the properties of
 * @return object that has the data, next and previous pages urls
 */
export const getProperties = async (url) => {
    try {
        const response = await axios.get(url);
        let next = null;
        let prev = null;
        let results = await response.data.results;
        /* whenever the results is undefined that means there was no pagination
        * available on tha page so get the data from `response.data`
        * */
        if (results === undefined) {
            results = [response.data];
        } else {
            next = await response.data.next;
            prev = await response.data.previous;
        }
        return ({
            data: results,
            next: next,
            prev: prev,
        });
    } catch(error) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
        return null;
    }
}

export default Property