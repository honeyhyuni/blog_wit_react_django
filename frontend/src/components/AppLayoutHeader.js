import React from "react"
import {useAppContext} from "store";
import BeforeLoginMenu from "./BeforeLoginMenu";
import AfterLoginMenu from "./AfterLoginMenu";
import logo_ from "assets/ani_logo.png"
import "./AppLayout.scss"

export default function AppLayoutHeader() {
    const {store:{jwtToken}} = useAppContext();
    return(
        <div className="header">
            <h1 className="page-title"><img src={logo_} alt="logo" style={{width:"120px"}}></img></h1>
            <div className="topnav">
            {jwtToken && jwtToken ? <AfterLoginMenu /> : <BeforeLoginMenu/>}
            </div>
        </div>
    );
}