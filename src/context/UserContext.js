import React, { createContext, useState } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const setCookieDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 365);
  return date;
};

export const UserContext = createContext({
  token: undefined,
});

export const UserContextProvider = (props) => {
  const [token, setToken] = useState(cookies.get("token"));

  const changeToken = (newToken) => {
    cookies.set("token", newToken, {
      path: "/",
      expires: setCookieDate(),
    });
    setToken(newToken);
  };

  const user = {
    token,
    changeToken,
  };

  return <UserContext.Provider value={user} {...props} />;
};
