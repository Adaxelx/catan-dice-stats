import proxy from "config/api";

export const saveFile = async (gameData) => {
  const url = `${proxy.FILE}save/`;

  const headers = {
    "Content-Type": "application/json",
  };

  const response = await fetch(url, {
    headers,
    method: "POST",
    body: JSON.stringify({ gameData }),
  });

  if (response.status === 200) {
    return response.json();
  }
  throw new Error("Nie udało się ");
};
