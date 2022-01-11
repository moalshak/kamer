import axios from 'axios';
import { useEffect, useState } from "react";

// const Property = () => {
//     return (
//         <div>
//             <h3>Property</h3>
//         </div>
//     )
// }

function Property() {
    const [properties, setProperties] = useState()
    axios.defaults.headers.common['Authorization'] = 'Token ff27fca94c0c9461da6e327389e7b633224cd2fa'

    useEffect(() => {
        getProperties()
    }, [])

    function getProperties() {
        let request_url = 'https://www.team13.xyz/api/all/?format=json';
    
        axios.get(request_url)
        .then((response) => {
            const data = response.data.results;
            console.log(data)
            // setProperties(data)
        }).catch((error) => {
            if (error.response) {
                console.log(error.response);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        })
    }

    return (
        <div className="property">

            <h3>
                {properties}
                DATA
            </h3>
        </div>
    )

}

export default Property