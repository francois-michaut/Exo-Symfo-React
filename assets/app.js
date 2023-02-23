/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';

// start the Stimulus application
import './bootstrap';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Users from './components/Users';
import Details from './components/Details';
import Modal from './components/Modal';

ReactDOM.render(
    <Router>
        <Routes>
                <Route path="/" element={<Users />} />
                <Route path="/details/user/:id" element={<Details />} />
                <Route path="/" element={<Modal />} /> 

        </Routes>
    </Router>,
    document.getElementById('root'));
