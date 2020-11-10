import proxy from "config/api";

export const saveFile = async (token, gameData, id) => {
  const url = id ? `${proxy.GAME}edit/${id}/` : `${proxy.GAME}add/`;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };

  const response = await fetch(url, {
    headers,
    method: id ? "PUT" : "POST",
    body: JSON.stringify({ ...gameData }),
  });

  if (response.status === 200) {
    return response.json();
  }
  if (response.status === 403) {
    const errorMessage = await response.json();
    throw new Error(errorMessage.message);
  }
  throw new Error("Błąd przesyłania.");
};

export const generateStats = async (gameData) => {
  const url = `${proxy.GAME}generateStats/`;

  const headers = {
    "Content-Type": "application/json",
  };

  const response = await fetch(url, {
    headers,
    method: "POST",
    body: JSON.stringify({ ...gameData }),
  });

  if (response.status === 200) {
    return response.json();
  }
  if (response.status === 403) {
    const errorMessage = await response.json();
    throw new Error(errorMessage.message);
  }
  throw new Error("Błąd przesyłania.");
};

export const getHistory = async (token, page = 1, pageSize = 10) => {
  const url = `${proxy.GAME}history/?page=${page}&pageSize=${pageSize}`;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };

  const response = await fetch(url, {
    headers,
    method: "GET",
  });

  if (response.status === 200) {
    return response.json();
  }
  if (response.status === 403) {
    const errorMessage = await response.json();
    throw new Error(errorMessage.message);
  }
  throw new Error("Nie udało się pobrać historii.");
};
