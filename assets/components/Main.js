import React, { Component } from "react";
import { Routes, Route } from "react-router";
import Home from "./Home";
import Users from "./Users";
import Posts from "./Posts";


class Main extends Component{
    render() {
        return (
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/users" element={<Users />} />
                <Route path="/posts" element={<Posts />} />
             </Routes>
        )
    }
}

export default Main;