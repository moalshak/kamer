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
    /* state for the page the user is on */
    const [page, setPage] = useState(1);
    /* state for the max page */
    const [maxPage, setMaxPage] = useState(1);
    
    useEffect(() => {
        getProperties()
    }, [])

    /**
     * fetched the properties from the api call
     */
    function getProperties() {
        let request_url = `https://www.team13.xyz/api/all/?format=json&page=${page}`;
    
        axios.get(request_url)
        .then((response) => {
            setMaxPage(response.data.count / 10) // set the max page
            return response.data.results
        }).then((data) => {
            setProperties(data);
            setLoading(false); // data is fetched no longer loading
        }).catch((error) => {
            if (error.response) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        })
    }

    /**
     * requests data from the next/prev page of the API.. PAGINATION 😎
     */
    function nextPage() {
        if (page <= maxPage + 1) {
            setPage((current) => current + 1);
            getProperties();
        }
    }
    function prevPage() {
        if (page > 1)  {
            setPage((current) => current - 1);
            getProperties();
        }
    }

    return (
        <div className="property">

            <h3>DATA</h3>
            <small>Current Page:{page}</small>
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
                        <li key={prop.externalId}>{prop.externalId}</li>
                        <ul>
                        <li>AreaSqm: {prop.areaSqm} </li>
                        <li>City: {prop.city} </li>
                        <li>CoverImageUrl: {prop.coverImageUrl} </li>
                        <li>Furnish: {prop.furnish} </li>
                        <li>Latitude: {prop.latitude} </li>
                        <li>Longitude: {prop.longitude} </li>
                        <li>PostalCode: {prop.postalCode} </li>
                        <li>PropertyType: {prop.propertyType} </li>
                        <li>Rent: {prop.rent} </li>
                        <li>Title: {prop.title} </li>
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