import React from "react";
import { Dashboard, History } from "views";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Navigation } from "components";
import styled from "styled-components";
import ThemeContextProvider from "context/ThemeContext";

const StyledApp = styled.div`
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
  position: relative;
`;

const App = () => {
  return (
    <StyledApp>
      <ThemeContextProvider>
        <BrowserRouter>
          <Navigation />
          <Switch>
            <Route path="/" exact={true}>
              <Dashboard />
            </Route>
            <Route path="/history">
              <History />
            </Route>
          </Switch>
        </BrowserRouter>
      </ThemeContextProvider>
    </StyledApp>
  );
};

export default App;
