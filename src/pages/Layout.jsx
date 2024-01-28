import React from "react";
import Nav from "../components/Layout/Nav/Nav";
import Header from "../components/Layout/Header/Header";
import StatusSearchBar from "../components/Layout/StatusSearchBar/StatusSearchBarCompo";

function Layout({ children }) {
    return (
        <>
            <Header />
            <Nav />
            <StatusSearchBar/>
            {children}
        </>
    )
}

export default Layout