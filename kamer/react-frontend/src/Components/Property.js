import axios from 'axios';
import {useEffect, useState} from "react";
import MapBuilder from './MapBuilder';

/**
 * Calls the API through a get method
 * 
 * @returns a list of a list fetched from the API at a certain page
 */

function Property ({ properties, setProperties, nav, setNav}) {
    /* state for loading : if the api call is still getting processed */
    const [loading, setLoading] = useState(true);
    
    /* state for the url */
    const [currUrl, setCurrUrl] = useState('https://www.team13.xyz/api/all/?format=json&page=1')
    const [nextUrl, setNextUrl] = useState(null)
    const [prevUrl, setPrevUrl] = useState(null)
    
    /* state for the current page number the user is on */
    const [curPage, setCurPage] = useState(1);



    // `getProperties` will "watch" the `currUrl` and update whenever it (currUrl) changes
    useEffect(() => {
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


    return (
        <div className="container">

            <h3>DATA</h3>

            {nav ?             <div className="nav">
                <small>Current Page: {getPageNumber('current')} </small>
                <br/>
                <small>Next Page: {getPageNumber('next')} </small>
                <br/>
                <small>Previous Page: {getPageNumber('prev')} </small>
                <div className="NextPrevBtn">
                    <button onClick={prevPage}>Previous Page</button>
                    <button onClick={nextPage}>Next Page</button>
                </div>
            </div> : null}
            
            {loading ? <b>"loading.."</b> : null} {/* if loading view loading */}
            <ul>
                {properties.map((prop) => {
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
                        <MapBuilder lng = {prop.longitude} lat={prop.latitude}/>
                        </ul>
                    </div>
                    );
                })}
            </ul>
        </div>
    )

}

/**
 * fetched the properties from the api call
 */
export const getProperties = async (url) => {
    try {
        const response = await axios.get(url);
        const next = await response.data.next;
        const prev = await response.data.previous;
        return await response.data.results;
    } catch(error) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
        return null;
    }
}

export const getPropertyById = async (id) => {
    const baseURL = "https://www.team13.xyz/api/";

    try {
        const response = await axios.get(baseURL + "id/" + id + "/?format=json");
        const result = await response.data;
        return [result];
    } catch (error) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
        return null;
    }
}


export default Property