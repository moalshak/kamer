import axios from 'axios';
import { useEffect, useState } from "react";

// const Property = () => {
//     return (
//         <div>
//             <h3>Property</h3>
//         </div>
//     )
// }

function Property () {
    const [loading, setLoading] = useState(true);
    const [properties, setProperties] = useState([])
    const [page, setPage] = useState(1);

    useEffect(() => {
        getProperties()
    }, [])

    function getProperties() {
        let request_url = `https://www.team13.xyz/api/all/?format=json&page=${page}`;
    
        axios.get(request_url)
        .then((response) => {
            return response.data.results
        }).then((data) => {
            console.log(data);
            setProperties(data);
            setLoading(false); // no longer loading
        }).catch((error) => {
            if (error.response) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        })
    }

    function nextPage() {
        setPage((current) => current + 1);
        console.log(page);
        getProperties();
    }

    return (
        <div className="property">

            <h3>DATA</h3>

            {loading ? <b>"loading.."</b> : null} {/* if loading view loading */}
            {!loading ? <button onClick={nextPage}>Next Page</button>: null}
            <ul>
                {properties.map((prop, index) => {
                    return (
                    <div>
                        <li>{prop.externalId}</li>
                        <ul>
                        <li>areaSqm: {prop.areaSqm} </li>
                        <li>city: {prop.city} </li>
                        <li>coverImageUrl: {prop.coverImageUrl} </li>
                        <li>furnish: {prop.furnish} </li>
                        <li>latitude: {prop.latitude} </li>
                        <li>longitude: {prop.longitude} </li>
                        <li>postalCode: {prop.postalCode} </li>
                        <li>propertyType: {prop.propertyType} </li>
                        <li>rent: {prop.rent} </li>
                        <li>title: {prop.title} </li>
                        <li>additionalCost: {prop.additionalCost} </li>
                        <li>deposit: {prop.deposit} </li>
                        <li>descriptionTranslated: {prop.descriptionTranslated} </li>
                        <li>gender: {prop.gender} </li>
                        <li>isRoomActive: {prop.isRoomActive} </li>
                        <li>pageDescription: {prop.pageDescription} </li>
                        <li>pageTitle: {prop.pageTitle} </li>
                        <li>pets: {prop.pets} </li>
                        <li>roommates: {prop.roommates} </li>
                        </ul>
                    </div>
                    );
                })}
            </ul>
        </div>
    )

}

export default Property