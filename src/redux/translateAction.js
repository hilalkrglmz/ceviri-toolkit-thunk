import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { options } from "../constants"


/* BÜTÜN DİLLERİ ALMAK İÇİN YAZDIĞIMIZ ACTION */

export const getLanguages = createAsyncThunk(
    "translate/getLanguages",
    async () => {

        /* API isteği atar */
        const res = await axios.request(options)

        /* return edip payload reducera aktarma */
        return res.data.data.languages;

    }
)

/* ÇEVİRMEK İÇİN */

export const translateText = createAsyncThunk(
    "translate/text",

    /* API İSTEĞİ */
    async ({sourceLang, targetLang, text}) => {
    
    /* API isteğine gönderilecek parametreler */
        const encodedParams = new URLSearchParams();
        encodedParams.set('source_language', sourceLang.value);
        encodedParams.set('target_language', targetLang.value);
        encodedParams.set('text', text);

        const options = {
            method: 'POST',
            url: 'https://text-translator2.p.rapidapi.com/translate',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'X-RapidAPI-Key': '3e56dc0d92mshe72babef2d7cee7p1c9cccjsn1be6ecd3c1a5',
                'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
            },
            data: encodedParams,
        };

        const res = await axios.request(options)    

        /* CEVABI SLİCE A AKTAR */

        return res.data.data.translatedText;

    }


)