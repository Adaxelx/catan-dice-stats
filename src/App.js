import React from "react";
import { Dashboard, History } from "views";
import { Switch, Route, HashRouter } from "react-router-dom";
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
          <HashRouter basename={process.env.PUBLIC_URL}>
            <Navigation />
            <Switch>
              <Route path={`/`} exact={true}>
                <Dashboard />
              </Route>
              <Route path={`/history`}>
                <History />
              </Route>
            </Switch>
          </HashRouter>
        </GameContextProvider>
      </ThemeContextProvider>
    </StyledApp>
  );
};

export default App;
