/*<============== CREDITS ==============>
        Author: berkahesport
        Github: https://github.com/BerkahEsport/
        Contact me: 6289654279897

        Do not delete the source code.
        It is prohibited to
        sell and buy scripts
        without the knowledge
        of the script owner.

        Thank you to Allah S.W.T
<============== CREDITS ==============>*/

export default {
name: "gdrive",
command: ["gdrive", "gddl"],
tags: "download",
desc: "",
customPrefix: "",
example: "https://drive.google.com/file/d/1uHMRQUplsB-aGgfzzicrnR9a3sG-l30R/view?usp=sharing",
limit: false,
isOwner: false,
isPremium: false,
isBotAdmin: false,
isAdmin: false,
isGroup: false,
isPrivate: false,
run: async(m, {
    args,
    axios,
    functions
    }) => {
    
async function GDriveDl(url) {
    if (!(url && url.match(/drive\.google/i))) return "Enter the Google Drive URL link correctly!"
    try {
        const id = (url.match(/\/?id=(.+)/i) || url.match(/\/d\/(.*?)\//))[1];
        if (!id) throw "ID Not Found";

        const response = await axios.post(
            `https://drive.google.com/uc?id=${id}&authuser=0&export=download`,
            {
                headers: {
                    "accept-encoding": "gzip, deflate, br",
                    "Content-Length": 0,
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                    "origin": "https://drive.google.com",
                    "x-client-data": "CKG1yQEIkbbJAQiitskBCMS2yQEIqZ3KAQioo8oBGLeYygE=",
                    "x-drive-first-party": "DriveWebUi",
                    "x-json-requested": "true"
                },
                responseType: "text"
            }
        );
        
        let {
                fileName,
                sizeBytes,
                downloadUrl
            } = JSON.parse((await response.data.text()).slice(4));
            if (!downloadUrl) throw "Link Download Limit!";
            let data = await functions.fetchJson(downloadUrl);
            if (data.status !== 200) return data.statusText
            return {
                downloadUrl,
                fileName,
                fileSize: functions.formatSize(sizeBytes),
                mimetype: data.headers.get("content-type")
            }
        } catch (e) {
            console.log(e);
        }
    }

    try {
        let res = await GDriveDl(args[0]);
        if (res.fileSize.slice(-2) == "GB") return m.reply(`File is too large. The size of the file you download: ${res.fileSize}`)
        if (!someincludes(["kB", "KB"], res.fileSize.slice(-2)) && parseInt(res.fileSize) > 500) return m.reply(`Filesize: ${res.fileSize}\nCannot send, maximum file 500 MB`)
        let txt = `*[ Downloading file ]*\n\n`
        txt += `*Name :* ${res.fileName}\n`
        txt += `*Size :* ${res.fileSize}\n`
        txt += `*Type :* ${res.mimetype}`
        await m.reply(txt, { font: true})
        if (!res.downloadUrl) throw ("Problematic download!")
        await conn.sendFile(m.from, res.downloadUrl, res.fileName + res.mimetype, res.fileName + res.mimetype, m)
    } catch (e) {
        console.log(e)
        const data = await functions.api("api/gdrive", args[0]);
        await sock.sendFile(m.from, data.result.link, "", "", m);
    }
}
}