import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

// containers
import Full from './containers/Full.js'
import 'bootstrap/dist/css/bootstrap.css';
import styles from './index.css'

ReactDOM.render((

    <BrowserRouter>
        <Switch>
            <Route path="/" name="Home" component={Full}/>
        </Switch>
    </BrowserRouter>
), document.getElementById('root'));