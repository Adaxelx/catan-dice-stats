import React from "react";
import { Dashboard, History, LoginPage } from "views";
import { Switch, Route, HashRouter } from "react-router-dom";
import { Navigation } from "components";
import styled from "styled-components";
import {
  ThemeContextProvider,
  GameContextProvider,
  UserContextProvider,
} from "context";

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
        <UserContextProvider>
          <GameContextProvider>
            <HashRouter basename={process.env.PUBLIC_URL}>
              <Navigation />
              <Switch>
                <Route path={`/`} exact={true}>
                  <Dashboard />
                </Route>
                <Route path={`/history`}>
                  <History />
                </Route>
                <Route path={`/login`}>
                  <LoginPage />
                </Route>
              </Switch>
            </HashRouter>
          </GameContextProvider>
        </UserContextProvider>
      </ThemeContextProvider>
    </StyledApp>
  );
};

export default App;
