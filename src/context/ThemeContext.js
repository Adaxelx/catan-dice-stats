import React, { createContext } from "react";

const theme = {
  colors: {
    blue: "#1f3057",
    yellow: "#fdd906",
    green: "#8fc693",
  },
};

export const ThemeContext = createContext(theme);

export const ThemeContextProvider = (props) => (
  <ThemeContext.Provider value={theme} {...props} />
);
