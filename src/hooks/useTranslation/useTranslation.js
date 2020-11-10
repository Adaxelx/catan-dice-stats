import { useContext } from "react";
import dictionary, { languages } from "constants/translations";
import { GameContext } from "context";

const useTranslation = () => {
  const gameContext = useContext(GameContext);

  const translate = (word) => {
    if (gameContext.language === languages.EN) return word;
    if (!isNaN(parseInt(word, 10))) return word;
    let translation = "";
    Object.keys(dictionary).forEach((key) => {
      if (key.toLowerCase() === word.toLowerCase()) {
        translation = dictionary[key];
        return;
      }
    });
    if (!translation) {
      return word;
    }
    return translation;
  };

  return translate;
};

export default useTranslation;
