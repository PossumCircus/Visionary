import React from "react";
import Nav from "../components/Layout/Nav/Nav";
import Header from "../components/Layout/Header/Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <>
            <Header />
            <Nav />
            <Outlet />
        </>
    )
}