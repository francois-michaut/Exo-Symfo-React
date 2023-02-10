// ./assets/js/components/Home.js
    
import React, {Component} from 'react';
import {Route, Switch,Redirect, Link, withRouter, Routes} from 'react-router-dom';
import Users from './Users';
import Posts from './Posts';
    
class Home extends Component {
    
    render() {
        return (
           <div>
               <h1>Page d'accueil</h1>
               <p>
                <Link className={"nav-link"} to={"/posts"}> Posts </Link>
                <Link className={"nav-link"} to={"/users"}> Users </Link>
               </p>
              
           </div>
        )
    }
}
    
export default Home;
