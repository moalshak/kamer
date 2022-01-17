import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'
import React from 'react';

const containerStyle = {
  width: '400px',
  height: '400px'
};


/**
 * setting the marker and position of the map
 * @param {string} lat, latitude of map
 * @param {string} lng, longitude of map
 */
function defineCenter(lat, lng) {
    const center = {
        lat: parseFloat(lat),
        lng: parseFloat(lng)
    }
    return center
}

// loads the javascript map component using openstreetmap api
function MyComponent({lat, lng}) {
    return (
        <MapContainer center={defineCenter(lat, lng)} zoom={23} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://api.maptiler.com/maps/hybrid/256/{z}/{x}/{y}.jpg?key=PcyTniEltBZifmZjT2ww"
            />
            <Marker position={defineCenter(lat, lng)}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
  )
}

export default React.memo(MyComponent)