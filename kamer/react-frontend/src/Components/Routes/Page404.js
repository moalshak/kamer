import React from "react";
import {Link} from "react-router-dom";

/**
 * 404 landing page
 * */
function Page404() {
    return (
        <div className="container">
            <h1>404</h1>
            <h1>You Got Lost!</h1>
            <Link to="/">Home Page</Link>
        </div>
    )
}


export default Page404;