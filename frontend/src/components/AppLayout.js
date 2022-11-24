import React from "react";
import logo_ from "assets/ani_logo.png"
import {Menu} from "antd";
import "./AppLayout.scss";

function AppLayout(){
    return(
        <div className="app">
            <div className="header">
                <img src={logo_} alt="logo" style={{width:"150px"}}></img>
                <div className="topnav">
                    <Menu>
                        <Menu.Item>1</Menu.Item>
                        <Menu.Item>2</Menu.Item>
                        <Menu.Item>3</Menu.Item>
                    </Menu>
                </div>
            </div>
        </div>
    );
}



export default AppLayout;