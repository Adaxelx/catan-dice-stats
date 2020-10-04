import proxy from "config/api";

export const saveFile = async (gameData, id) => {
  const url = id ? `${proxy.GAME}edit/${id}/` : `${proxy.GAME}add/`;

  const headers = {
    "Content-Type": "application/json",
  };

  const response = await fetch(url, {
    headers,
    method: id ? "PUT" : "POST",
    body: JSON.stringify({ ...gameData }),
  });

  if (response.status === 200) {
    return response.json();
  }
  throw new Error("Nie udało się ");
};

export const getHistory = async (page = 1, pageSize = 10) => {
  const url = `${proxy.GAME}history/?page=${page}&pageSize=${pageSize}`;

  const headers = {
    "Content-Type": "application/json",
  };

  const response = await fetch(url, {
    headers,
    method: "GET",
  });

  if (response.status === 200) {
    return response.json();
  }
  throw new Error("Nie udało się ");
};
