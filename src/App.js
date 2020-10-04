import React from "react";
import { Dashboard, History } from "views";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Navigation } from "components";
import styled from "styled-components";
import { ThemeContextProvider, GameContextProvider } from "context";

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
        <GameContextProvider>
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
        </GameContextProvider>
      </ThemeContextProvider>
    </StyledApp>
  );
};

export default App;
