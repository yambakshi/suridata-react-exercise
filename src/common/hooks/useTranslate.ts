import { BlogPostRow } from "../types";
import { Language } from "../enums";
import axios from 'axios';
import React from "react";


export const useTranslate = () => {
    const [loading, setLoading] = React.useState<boolean>(false);

    const translatePage = async ({ data, language }: { data: BlogPostRow[], language: Language }) => {
        try {
            setLoading(true);

            // If all displayed rows were already translated
            if (data.every(({ title }) => title[language])) {
                return;
            }

            // Extract all english text from displayed rows
            const displayedRowsTexts = data.reduce((acc: { text: string }[], { title, body }) => {
                return [
                    ...acc,
                    { 'text': title[Language.English] },
                    { 'text': body[Language.English] }
                ]
            }, []);

            // Fetch translations
            const { v4: uuidv4 } = require('uuid');
            const key = '083f98b1ea1e49bcbadc13de4616d9a8'; // Security Vulnrability! should be in server
            const location = 'centralus';
            const endpoint = `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=${Language.English}&to=${language}`;

            return axios.post(
                endpoint,
                displayedRowsTexts,
                {
                    headers: {
                        'Ocp-Apim-Subscription-Key': key,
                        'Ocp-Apim-Subscription-Region': location,
                        'Content-type': 'application/json',
                        'X-ClientTraceId': uuidv4().toString()
                    }
                })
        } catch (error) {
            console.error('Error translating text:', error);
        } finally {
            setLoading(false);
        }
    }

    return {
        translatePage,
        loading
    };
}