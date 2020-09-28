const diceNumbers = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const emptyDiceStats = (() => {
  const object = {};
  diceNumbers.map((value) => (object[value] = 0));
  return object;
})();

export default diceNumbers;
