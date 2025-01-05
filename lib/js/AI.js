/*<============== CREDITS ==============>
	Author: berkahesport
	Github: https://github.com/BerkahEsport/
	Contact me: 62895375950107
	
	Do not delete the source code.
	It is prohibited to sell and buy
	WhatsApp BOT scripts
	without the knowledge
	of the script owner.
	
	Selling = Sin 
	
	Thank you to Allah S.W.T
<============== CREDITS ==============>*/

import got from "got";
import fs from "fs";
import path from "path";
import { fileTypeFromBuffer } from "file-type";
import config from "../../config.js";
import functions from "../functions.js";
import { textToSpeech } from "./textToSpeech.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager, FileState } from "@google/generative-ai/server";

const CONFIG = {
    RestApiBE: {
        base: "https://berkahesport.my.id/",
        apikey: config.settings.apikey // Contact me for the API key https:/wa.me/62895375950107
    },
    system: "Kamu adalah asisten AI bernama BerkahEsport.ID. Penuhi permintaan user seperti meminta membuatkan gambar atau mendeskripsikan gambar, jika meminta musik maka kirimkan musik yang user minta. Kamu juga bergerak di bidang whatsapp bot, dan jasa perbaikan bot whatsapp. Tugas kamu adalah menjawab dalam bahasa yang sama dengan bahasa yang digunakan oleh user dalam pertanyaannya. Jika user menggunakan bahasa Indonesia, jawab dalam bahasa Indonesia. Jika user menggunakan bahasa Inggris, jawab dalam bahasa Inggris. Jangan pernah gunakan bahasa lain selain yang dipakai oleh user!", // Change according to the character of the AI answer you want
    googleAPIKey: "AIzaSyCSPqv9AlKA9VWvOrqkqZF_a343JK8yCyg",
    yanzGPT: {
        url: "https://api.yanzgpt.my.id/v1/chat",
        key: "yzgpt-sc4tlKsMRdNMecNy",
        model: "yanzgpt-revolution-25b-v3.0",
    },
    groqAI: {
        url: "https://api.groq.com/openai/v1/chat/completions",
        key: config.settings.groqkey, // Contact me for the API key https:/wa.me/62895375950107 or source code https://console.groq.com/keys
        model: "mixtral-8x7b-32768",
    },
    maxTokens: 1024,
    maxRetries: 3,
};

const genAI = new GoogleGenerativeAI(CONFIG.googleAPIKey);
const fileManager = new GoogleAIFileManager(CONFIG.googleAPIKey);
export default async function gpt(text, buffer, quoted) {
    const processGenerativeResponse = async (text, buffer) => {
        const data = await functions.getFile(buffer);
        console.log(data.filename);
        const fileUpload = await fileManager.uploadFile(data.filename, {
            mimeType: data.mime,
            displayName: path.basename(data.filename)
        });
        if (fileUpload.error) throw new Error(`File upload failed: ${fileUpload.error.message}`);
        if (data.mime.startsWith("video")) {
            let retries = 0;
            let file;
            do {
                file = await fileManager.getFile(fileUpload.file.name);
                if (file.state === FileState.PROCESSING) await new Promise((r) => setTimeout(r, 5000));
            } while (file.state === FileState.PROCESSING && ++retries < CONFIG.maxRetries);
            if (file.state === FileState.FAILED) throw new Error("Video processing failed.");
        }
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", systemInstruction: CONFIG.system });
        const result = await model.generateContent([
            { fileData: { mimeType: fileUpload.file.mimeType, fileUri: fileUpload.file.uri } },
            { text },
        ]);
        return result.response.text();
    };
    const fetchAPIResponse = async (text, apiConfig) => {
        const { url, key, model } = apiConfig;
        const response = await got.post(url, {
            json: {
                messages: [{ role: "system", content: CONFIG.system }, { role: "user", content: text }],
                model,
                temperature: 0.7,
                max_tokens: CONFIG.maxTokens,
            },
            headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
            responseType: "json",
        });
        return {
            success: response.statusCode === 200,
            content: response.body.choices[0].message.content,
            image: response.body.choices[0].message.image,
            audio: null
        }
    };

    try {
        if (buffer && !quoted.ptt) {
            const content = await processGenerativeResponse(text, buffer);
            return {
                success: true,
                content,
                audio: null,
                image: null
            };
        } else {
            let content, image = "";
            try {
                content = await fetchAPIResponse(text, CONFIG.yanzGPT);
                return {
                    success: true,
                    content: content.content,
                    audio: null,
                    image: content.image
                };
            } catch (yanzErr) {
                try {
                    console.error("GPT failed, falling back to GroqAI:", yanzErr.message);
                    content = await fetchAPIResponse(text, CONFIG.groqAI);
                    try {
                    image = await functions.fetchJson(CONFIG.RestApiBE.base+'api/sanaai?text='+functions.truncateText(text, 150)+'&apikey='+CONFIG.RestApiBE.apikey);
                    } catch (error) {
                        image = null;
                        console.error("Error processing image request:", error);
                    }
                    const audioBuffer = await textToSpeech(content.content);
                    const audioPath = functions.fetchBuffer(audioBuffer);
                    return {
                        success: true,
                        content: content.content,
                        audio: audioPath,
                        image: content.image ? content.image : image
                    };
                } catch(groqErr) {
                    console.error("GroqAI failed: "+groqErr.message, groqErr);
                    content = await functions.fetchJson(CONFIG.RestApiBE.base+'api/chatgpt?text='+functions.truncateText(text, 150)+'&apikey='+CONFIG.RestApiBE.apikey);
                    return {
                        success: false,
                        content: content.result,
                        audio: null,
                        image: null
                    };
                }
            }
        }
    } catch (error) {
        console.error("Error processing GPT request:", error);
        return {
            success: false,
            content: "Sorry, AI failed to respond. Please rephrase the question!",
            audio: null,
            image: null,
        };
    }
}