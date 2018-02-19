import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch} from 'react-router-dom';

// Containers
import Full from './containers/Full.js'

ReactDOM.render((
    <HashRouter>
        <Switch>
            <Route path="/" name="Home" component={Full}/>
        </Switch>
    </HashRouter>
), document.getElementById('root'));