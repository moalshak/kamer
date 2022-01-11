import axios from 'axios';
import { useEffect, useState } from "react";

/**
 * Calls the API through a get method
 * 
 * @returns a list of a list fetched from the API at a certain page
 */
function Property () {
    /* state for loading : if the api call is still getting processed */
    const [loading, setLoading] = useState(true);
    /* state properties */
    const [properties, setProperties] = useState([])
    /* state for the url */
    const [currUrl, setCurrUrl] = useState('https://www.team13.xyz/api/all/?format=json&page=1')
    const [nextUrl, setNextUrl] = useState(null)
    const [prevUrl, setPrevUrl] = useState(null)
    
    // `getProperties` will "watch" the `currUrl` and update whenever it (currUrl) changed
    useEffect(() => {
        getProperties()
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
        }
    }
    function prevPage() {
        if (prevUrl != null) {
            setCurrUrl(prevUrl);
        }
    }
    
    return (
        <div className="property">

            <h3>DATA</h3>
            <small>Current Page:{currUrl}</small>
            <small>Next Page:{nextUrl}</small>
            <small>prev Page:{prevUrl}</small>
            {loading ? <b>"loading.."</b> : null} {/* if loading view loading */}
            {!loading ?
                <div className="NextPrevBtn"> 
                    <button onClick={prevPage}>Previous Page</button>
                    <button onClick={nextPage}>Next Page</button>
                </div>
            : null
            }
            <ul>
                {properties.map((prop) => {
                    return (
                    <div>
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
                        </ul>
                    </div>
                    );
                })}
            </ul>
        </div>
    )

}

export default Property