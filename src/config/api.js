const backendUrl = process.env.REACT_APP_BACKEND;

const proxy = {
  GAME: `${backendUrl}game/`,
  LOGIN: `${backendUrl}login/`,
};

export default proxy;
