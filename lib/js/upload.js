/*<============== CREDITS ==============>
    Author: berkahesportid
    Github: https://github.com/BerkahEsport/
    Contact me: 6289654279897
    
    Do not delete the source code.
    It is prohibited to
    sell and buy scripts
    without the knowledge
    of the script owner.
    
    Thank you to Allah S.W.T
<============== CREDITS ==============>*/
import fs from "fs";
import FormData from "form-data";
import axios from "axios";
const author = "berkahesport";
const info = "Jangan lupa kasih bintang ⭐ pada script bot disini: https://github.com/BerkahEsport/botbe";

export default async function upload(bufferFile) {
    try {
        const form = new FormData();
        if (Buffer.isBuffer(bufferFile)) {
            form.append("fileToUpload", bufferFile, { filename: "upload" });
        } else {
            form.append("fileToUpload", fs.createReadStream(bufferFile));
        }
        
        form.append("reqtype", "fileupload");
        const response = await axios.post("https://catbox.moe/user/api.php", form, {
            headers: {
                ...form.getHeaders(),
            },
        });

        return {
            status: 200,
            author,
            info,
            result: response.data.trim(),
        };
    } catch (error) {
        console.error(error);
        return {
            status: 404,
            author,
            info,
            result: error.message,
        };
    }
}
