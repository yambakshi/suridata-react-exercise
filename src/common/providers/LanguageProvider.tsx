import { LanguageContext } from "../context/LanguageContext";
import { ReactElement } from "react";
import { Language } from "../enums";
import React from "react";


export const LanguageProvider = ({ children }: { children: ReactElement }) => {
    const [language, setLanguage] = React.useState<Language>(Language.English);

    return (
        <LanguageContext.Provider value={{ language, setLanguage }}>
            {children}
        </LanguageContext.Provider>);
}