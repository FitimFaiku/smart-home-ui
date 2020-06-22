import * as React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import Blind from "./container/Blind/Blind";
import {BLIND, LIGHT, WEATHER} from "./constants/routes";
import Weather from "./container/Weather/Weather";
import Light from "./container/Light/Light";
import Home from "./container/Home/Home";

function App() {
  return (
      <Router>
        <>
        <Header />
          <main id="app-main-id">
              <Route exact={true} key="route-1" path={'/'}>
                  <Home />
              </Route>
            <Route exact={true} key="route-2" path={WEATHER}>
              <Weather />
            </Route>
            <Route exact key="route-3" path={BLIND}>
              <Blind />
            </Route>
            <Route exact key="route-4" path={LIGHT}>
              <Light />
            </Route>
          </main>
        </>
      </Router>
  );
}

export default App;
