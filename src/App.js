import React from "react";
import {Dashboard,History} from "views";
import {BrowserRouter,Switch,Route} from 'react-router-dom';

const App = () => {
  return (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact={true}>
        <Dashboard />
      </Route>
      <Route path="/history">
        <History />
      </Route>
    </Switch>
  </BrowserRouter>
  );
}

export default App;
