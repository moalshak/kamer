import {useState, useEffect} from "react";
import axios from 'axios';

// const Property = () => {
//     return (
//         <div>
//             <h3>Property</h3>
//         </div>
//     )
// }

function Property() {
    const [properties, setProperties] = useState(null)
    axios.defaults.headers.common['Authorization'] = 'Token ff27fca94c0c9461da6e327389e7b633224cd2fa'

    useEffect(() => {
        getProperties()
    }, [])

    function getProperties() {
        let webApiUrl = 'https://www.team13.xyz/api/all/?format=json';
        let token = 'ff27fca94c0c9461da6e327389e7b633224cd2fa';
        // axios.get(webApiUrl, { headers: { Authorization: `Bearer ${token}`}});

        axios.get('https://www.team13.xyz/api/all/?format=json').then((response) => {
            const data = response.data.['results']
            setProperties(data)
            console.log(data[0])
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