import React from "react";
import ControlPanel from './Components/ControlPanel'
import Property from './Components/Property';
import axios from "axios";
// import PropertyFeed from './Components/PropertyFeed';
// import InputPanel from './Components/InputPanel';

function App() {
    axios.defaults.headers.common['Authorization'] = 'Token ff27fca94c0c9461da6e327389e7b633224cd2fa'
    return (
        <div className="App">
            <ControlPanel/>
            <Property/>
            {/*<PropertyFeed/>*/}
            {/*<InputPanel/>*/}
        </div>
    );
}

export default App;
