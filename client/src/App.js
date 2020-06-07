import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch ,Router} from "react-router-dom";
import Map from './components/Map/Map'
import Home from './components/Home/Home';
import { createBrowserHistory } from "history";

const history = createBrowserHistory();
const index =1
function App() {
  return (
    <BrowserRouter >
    <div className="App" style={{backgroundColor:'#E0FFFF',height:'50vw'}} >
    {/* style={{backgroundColor:'rgb(138, 180, 248)'}} */}
    <Router history={history}>

      <Switch>
    
                <Route
                 path="/map"  >
                   
                    <Map />
                </Route>
                <Route path="/" >
                  <Home />
                </Route>
            </Switch>
            </Router>

    </div>

    </BrowserRouter>
  );
}

export default App;
