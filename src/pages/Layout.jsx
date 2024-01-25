import React from "react";
import Nav from "../components/Layout/Nav/Nav";

function Layout({children}) {
    return (
        <>
            <Nav />
            {children}
        </>
    )
}

export default Layout