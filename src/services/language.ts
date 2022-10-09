/** @format */

import { useCallback } from "react";
import { useRecoilState, SetterOrUpdater, atom } from "recoil";
// import ThemeState from "../store/theme";
// import { ThemeInterface } from "../store/theme.types";
export interface LanguageInterface {
  language: string;
}

export const languageState = atom<LanguageInterface>({
  key: "languageState",
  default: {
    language: "th",
  },
});

type title = string | null | undefined;
interface IUseLanguage {
  language: string;
  setLanguageState: SetterOrUpdater<LanguageInterface>;
  getTitle: (th: title, en: title) => title;
}

function useLanguage(): IUseLanguage {
  const [getLanguage, setLanguageState] = useRecoilState(languageState);
  const language = getLanguage?.language || "th";

  const getTitle = useCallback(
    (th: title, en: title): title => {
      if (language === "en" && en) return en;
      return th || en;
    },
    [language]
  );

  return {
    language,
    setLanguageState,
    getTitle,
  };
}

export default useLanguage;
