import React from "react";
import Nav from "../components/Layout/Nav/Nav";
import Header from "../components/Layout/Header/Header";

export default function Layout({ children }) {
    return (
        <>
            <Header />
            <Nav />
            {children}
        </>
    )
}