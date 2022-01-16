import axios from 'axios';
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import MapBuilder from "./MapBuilder";

import {BASE_URL} from "../App";

/**
 * Calls the API through a get method
 *
 * @returns a list of a list fetched from the API at a certain page
 */

function Property({nav, setNav}) {
    /* state for loading : if the api call is still getting processed */
    const [loading, setLoading] = useState(true);
    //properties state
    const [properties, setProperties] = useState([])

    const navigate = useNavigate();

    // `getProperties` will "watch" the `nav.curr` and update whenever it (nav.curr) changes
    useEffect(async () => {
        setLoading(true);
        const response = await getProperties(nav.curr);
        const {data, next, prev, count} = response;
        setProperties(data);
        console.log(data);
        setNav({
            ...nav,
            next: next,
            prev: prev,
            count: count,
        });
        setLoading(false);
    }, [nav.curr])

    /**
     * requests data from the next/prev page of the API.. PAGINATION 😎
     */
    function nextPage() {
        if (nav.next != null) {
            setNav({...nav, curr: nav.next});
        }
    }

    function prevPage() {
        if (nav.prev != null) {
            setNav({...nav, curr: nav.prev});
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
                if (currentPageNumber - 1 > 0) {
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
    function Navigation() {
        return (
            <div className="nav">
                <small>Current Page: {getPageNumber('current')} </small>
                <small>|| Max Page: {nav.count ? nav.count : 1} </small>
                <br/>
                {nav.next ? <small>Next Page: {getPageNumber('next')} </small> : null}
                {nav.prev ? <small>|| Previous Page: {getPageNumber('prev')}</small> : null}
                <div className="NextPrevBtn">
                    {nav.prev ? <button className="smallButton" onClick={prevPage}>Previous Page</button> : null}
                    {nav.next ? <button className="smallButton" onClick={nextPage}>Next Page</button> : null}
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
                        <li key={prop.externalId}>
                            <h2>
                                <Link to={`/property/${prop.externalId}`}> {prop.pageTitle} </Link>
                            </h2>
                        </li>
                        <Link style={{"text-align": "right"}} to={`/edit/${prop.externalId}`}>Edit This
                            Property</Link>
                        <ul>
                            <img className="center" src={prop.coverImageUrl}
                                 alt={"Sorry Image Was Deleted :("}/>
                            <li>Rent Price: € {prop.rent} </li>
                            <li>Placed In: {prop.city} </li>
                            <li>Property Type: {prop.propertyType} </li>
                            <li>Gender: {prop.gender} </li>
                            {prop.isRoomActive ? <li> IsRoomActive: {prop.isRoomActive} </li> : null}
                            <li>Property Id : {prop.externalId}</li>
                            <MapBuilder lng={prop.longitude} lat={prop.latitude}/>

                        </ul>
                    </div>
                );
            })
        );
    }

    /**
     * When No Properties are found
     * */
    function NoProperties() {
        return (
            <div className="propDiv">
                <li>No Properties Found</li>
            </div>
        )
    }

    return (
        <div className="container">

            <Navigation/>

            {loading ? <h1>Loading...</h1> : null} {/* if loading view loading */}

            <ul>
                {properties.length === 0 ? <NoProperties/> : <Desc/>}
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
        let next = null, prev = null, count = null;
        let results = await response.data.results;
        /* whenever the results is undefined that means there was no pagination
        * available on the page so get the data from `response.data`
        * */
        if (results === undefined) {
            if (!Array.isArray(response.data)) {
                results = [response.data];
            } else {
                results = response.data;
            }
        } else {
            next = await response.data.next;
            prev = await response.data.previous;
            count = await response.data.count;
        }
        return ({
            data: results,
            next: next,
            prev: prev,
            count: count,
        });
    } catch (error) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
        return ({
            data: [],
            next: null,
            prev: null,
            count: 0,
        })
    }
}

/**
 * Deletes a property at the given url with the given payload
 *
 * @param url the url to `DELETE` at
 * @param payload the payload to send with the request
 */
export const delProperty = async (url, payload) => {
    try {
        const response = await axios.delete(url, payload);
        return response;
    } catch (error) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
        return null;
    }
}


/**
 * Does a post request to the sepecified url aka endpoints given a payload
 *
 * @param url the endpoint to request to
 * @param payload the payload to send with the request
 *
 * @returns the response data
 * */
export const postProperty = async (url, payload) => {
    try {
        const response = await axios.post(url, payload);
        return response;
    } catch (error) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
        return null;
    }
}

/**
 * Does a put request to the sepecified url aka endpoints given a payload
 *
 * @param url the endpoint to request to
 * @param payload the payload to send with the request
 *
 * @returns the response data
 * */
export const putId = async (url, payload) => {
    try {
        const response = await axios.put(url, payload);
        return response;
    } catch (error) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
        return null;
    }
}

export const putLocation = async (url, payload) => {
    try {
        const response = await axios.put(url, payload);
        return response;
    } catch (error) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
        return null;
    }
}


export const getCityStats = async (city) => {
    try {
        const url = `${BASE_URL}city/stats/${city}/?format=json`
        const response = await axios.get(url);
        return ({
            city: city,
            rcMean: response.data.rcMean,
            rdMean: response.data.rdMean,
            rcMedian: response.data.rcMedian,
            rdMedian: response.data.rdMedian,
            rcSd: response.data.rcSd,
            rdSd: response.data.rdSd,
        })
    } catch (error) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
        return null;
    }
}

export default Property
