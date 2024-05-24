export default {
name: "gdrive",
command: ["gdrive"],
tags: "download",
desc: "",
customPrefix: "",
example: "",
limit: false,
isOwner: false,
isPremium: false,
isBotAdmin: false,
isAdmin: false,
isGroup: false,
isPrivate: false,
run: async(m, {
    prefix,
    noPrefix,
    command,
    arg,
    args,
    text,
    sock,
    commands,
    cmd,
    name,
    user,
    settings,
    stats,
    isGroup,
    isAdmin,
    isBotAdmin,
    admin,
    metadata,
    participants,
    store,
    config,
    functions,
    axios,
    cheerio
}) => {
    async function GDriveDl(url) {
    if (!(url && url.match(/drive\.google/i))) return "Enter the Google Drive URL link correctly!"
    try {
        const id = (url.match(/\/?id=(.+)/i) || url.match(/\/d\/(.*?)\//))[1];
        if (!id) throw 'ID Not Found';

        const response = await axios.post(
            `https://drive.google.com/uc?id=${id}&authuser=0&export=download`,
            {
                headers: {
                    'accept-encoding': 'gzip, deflate, br',
                    'Content-Length': 0, // Panjang konten adalah 0 karena tidak ada body
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                    'origin': 'https://drive.google.com',
                    'x-client-data': 'CKG1yQEIkbbJAQiitskBCMS2yQEIqZ3KAQioo8oBGLeYygE=',
                    'x-drive-first-party': 'DriveWebUi',
                    'x-json-requested': 'true'
                },
                // responseType: 'text'
            }
        );
m.log(response)
            // let {
            //     fileName,
            //     sizeBytes,
            //     downloadUrl
            // } = JSON.parse((await response.data.text()).slice(4))
            // if (!downloadUrl) throw 'Link Download Limit!'
            // let data = await functions.fetchJson(downloadUrl)
            // if (data.status !== 200) return data.statusText
            // return {
            //     downloadUrl,
            //     fileName,
            //     fileSize: functions.formatSize(sizeBytes),
            //     mimetype: data.headers.get('content-type')
            // }
        } catch (e) {
            console.log(e)
        }
    }


    // if (!(args[0] || '').match(/([\w-]){33}|([\w-]){19}/)) throw '[!] Input GoogleDrive URL'
    // try {
        let res = await GDriveDl(args[0])
        m.log(res)
        // if (res.fileSize.slice(-2) == "GB") return m.reply(`Ngotak dong.\nMana bisa ngirim video ${res.fileSize}`)
        // if (!someincludes(['kB', 'KB'], res.fileSize.slice(-2)) && parseInt(res.fileSize) > 500) return m.reply(`Filesize: ${res.fileSize}\nTidak dapat mengirim, maksimal file 500 MB`)
        // let txt = `*[ Downloading file ]*\n\n`
        // txt += `*Name :* ${res.fileName}\n`
        // txt += `*Size :* ${res.fileSize}\n`
        // txt += `*Type :* ${res.mimetype}`
        // await m.reply(txt, { font: true})
        // if (!res.downloadUrl) throw "Problematic download!"
        // await conn.sendFile(m.from, res.downloadUrl, res.fileName + res.mimetype, res.fileName + res.mimetype, m)
    // } catch (e) {
    //     console.log(e)
    //     throw 'Bot tidak memiliki akses ke GoogleDrive ini'
    // }
}
}