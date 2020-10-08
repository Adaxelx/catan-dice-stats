import dictionary from "constants/translations";

const useTranslation = () => {
  const translate = (word) => {
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
