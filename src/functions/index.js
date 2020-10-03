import proxy from "config/api";

export const saveFile = async (gameData) => {
  const url = `${proxy.GAME}add`;

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
