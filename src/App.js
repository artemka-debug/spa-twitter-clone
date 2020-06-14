import React from 'react';
import './App.css';
import SignUp from "./components/SignUp";
import LogIn from "./components/Login";
import {Switch, Route} from "react-router-dom";
import Blog from "./components/Blog";
import Logo from "./components/Logo";
import LeftNavBar from "./components/LeftNavBar";
import PostViewer from "./components/PostViewer";
import Profile from "./components/Profile";

export default class App extends React.Component {
    render() {
        return (
            <div style={{display: 'flex'}}>
                <Logo/>
                <LeftNavBar/>

                <Switch>
                    <Route exact path={"/"} component={Blog}/>
                    <Route path={"/login"} component={LogIn}/>
                    <Route path={"/sign-up"} component={SignUp}/>
                    <Route path={"/profile/:id"} component={Profile}/>
                    <Route path={"/tweet/:id"} component={PostViewer}/>
                </Switch>
            </div>
        );
    }
}


