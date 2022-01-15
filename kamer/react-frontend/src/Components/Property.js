import axios from 'axios';
import {useEffect, useState} from "react";
import MapBuilder from './MapBuilder';


const BASE_URL = "https://www.team13.xyz/api/";

/**
 * Calls the API through a get method
 * 
 * @returns a list of a list fetched from the API at a certain page
 */

function Property ({ nav, setNav}) {
    /* state for loading : if the api call is still getting processed */
    const [loading, setLoading] = useState(true);
    //properties state
    const [properties, setProperties] = useState([])


    // `getProperties` will "watch" the `nav.curr` and update whenever it (currUrl) changes
    useEffect(async () => {
        setLoading(true);
        const {data, next, prev} = await getProperties(nav.curr);
        setProperties(data);
        setNav({
            ...nav,
            next: next,
            prev: prev,
        });
        setLoading(false);
    }, [nav.curr])

    /**
     * requests data from the next/prev page of the API.. PAGINATION 😎
     */
    function nextPage() {
        if (nav.next != null) {
            setNav({...nav, curr : nav.next});
        }
    }
    function prevPage() {
        if (nav.prev != null) {
            setNav({...nav, curr : nav.prev});
        }
    }
    
    /**
     * Retrieves the page number from the url
     */
    function getPageNumber(place) {
        let currentPageNumber;
        if (nav.curr != null && nav.curr !== '') {
            currentPageNumber = parseInt(nav.curr.split("&page=")[1]); // extract after ?page=x
        }
        if (!currentPageNumber) currentPageNumber = 1;

        switch (place) {
            case 'next':
                return currentPageNumber + 1;
            case 'current':
                return currentPageNumber;
            case 'prev':
                if (currentPageNumber - 1  > 0) {
                    return currentPageNumber - 1;
                } else {
                    return null;
                }
            default:
                return currentPageNumber;
        }   
    }

    /**
     * Navigation component
     * */
    function Navigation () {
        return (
            <div className="nav">
                    <small>Current Page: {getPageNumber('current')} </small>
                    <br/>
                {nav.next ? <small>Next Page: {getPageNumber('next')} </small> : null}
                    <br/>
                {nav.prev ? <small>Previous Page: {getPageNumber('prev')}</small> : null}
                    <div className="NextPrevBtn">
                        {nav.prev ? <button onClick={prevPage}>Previous Page</button> : null}
                        {nav.next ? <button onClick={nextPage}>Next Page</button> : null}
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