// ./assets/js/components/Home.js
    
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

    
class Home extends Component {
    
    render() {
        return (
           <div>
               <h1 className='home__title'>Page d'accueil</h1>
               <nav>
                <ul className="home__navbar">
                    <li>
                        <Link className={"nav-link"} to={"/posts"}> Posts </Link>
                    </li>
                    <li>
                        <Link className={"nav-link"} to={"/users"}> Users </Link>
                    </li>
                </ul>
               </nav>
               
                            
           </div>
        )
    }
}
    
export default Home;
