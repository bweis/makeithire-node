import {React, Component} from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import {createBrowserHistory} from 'history';

import Full from './containers/Full.js'

const history = createBrowserHistory();

class App extends Component {
  
  render() {
    return (
        <HashRouter history={history}>
          <Switch>
            <Route path="/" name="Home" component={Full}/>
          </Switch>
        </HashRouter>
    );
  }
}
export default App;
