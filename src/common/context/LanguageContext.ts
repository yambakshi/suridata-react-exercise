import { Language } from "../enums";
import React from "react";

export const LanguageContext = React.createContext<{
    language: Language,
    setLanguage?: React.Dispatch<React.SetStateAction<Language>>
}>({ language: Language.English, setLanguage: undefined });