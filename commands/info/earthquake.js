/*<============== CREDITS ==============>
        Author: berkahesport
        Github: https://github.com/BerkahEsport/
        Contact me: 62895375950107

        Do not delete the source code.
        It is prohibited to
        sell and buy scripts
        without the knowledge
        of the script owner.

        Thank you to Allah S.W.T
<============== CREDITS ==============>*/

export default {
    name: "earthquake",
    command: ["earthquake", "eq"],
    tags: "info",
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
        sock,
        functions
    }) => {
        const link = "https://data.bmkg.go.id/DataMKG/TEWS/";
        try {
            let eq = await functions.fetchJson(link + "autogempa.json");
            eq = eq.Infogempa.gempa;
            let txt = `🌐 *Wilayah:* ${eq.Wilayah}\n📅 *Tanggal:* ${eq.Tanggal}\n🕒 *Waktu:* ${eq.Jam}\n💢 *Potensi:* ${eq.Potensi}\n\n📏 *Magnitude:* ${eq.Magnitude}\n🌊 *Kedalaman:* ${eq.Kedalaman}\n📍 *Koordinat:* ${eq.Coordinates}${eq.Dirasakan.length > 3 ? `\n👤 *Dirasakan:* ${eq.Dirasakan}` : ""}`;
            let msg = await sock.sendMessage(m.from, {
                location: {
                    degreesLatitude: eq.Coordinates.split(",")[0],
                    degreesLongitude: eq.Coordinates.split(",")[1],
                    name: eq.Coordinates,
                    contextInfo: {
                        externalAdReply: {
                            title: "🌍 Info Gempa Terkini 🌋",
                            body: eq.Potensi,
                            renderLargerThumbnail: true,
                            mediaUrl: "",
                            mediaType: 1,
                            thumbnail: await (await functions.getFile(link + eq.Shakemap)).data,
                            sourceUrl: ""
                        }
                    }
                }
            }, {
                quoted: m
            });
            await sock.reply(m.from, txt.replaceAll("%p", "```"), msg, {font: true});
        } catch (e) {
            m.log(e);
            try {
                let eq = await functions.fetchJson(link + "gempaterkini.json");
                eq = eq.Infogempa.gempa[0];
                let txt = `🌐 *Wilayah:* ${eq.Wilayah}\n📅 *Tanggal:* ${eq.Tanggal}\n🕒 *Waktu:* ${eq.Jam}\n💢 *Potensi:* ${eq.Potensi}\n\n📏 *Magnitude:* ${eq.Magnitude}\n🌊 *Kedalaman:* ${eq.Kedalaman}\n📍 *Koordinat:* ${eq.Coordinates}${eq.Dirasakan.length > 3 ? `\n👤 *Dirasakan:* ${eq.Dirasakan}` : ""}`;
                let msg = await sock.sendMessage(m.from, {
                    location: {
                        degreesLatitude: eq.Coordinates.split(",")[0],
                        degreesLongitude: eq.Coordinates.split(",")[1],
                        name: eq.Coordinates,
                        contextInfo: {
                            externalAdReply: {
                                title: "🌍 Info Gempa Terkini 🌋",
                                body: eq.Potensi,
                                renderLargerThumbnail: true,
                                mediaUrl: "",
                                mediaType: 1,
                                thumbnail: await (await functions.getFile(link + eq.Shakemap)).data,
                                sourceUrl: ""
                            }
                        }
                    }
                }, {
                    quoted: m
                });
                await sock.reply(m.from, txt.replaceAll("%p", "```"), msg, {font: true});
            } catch (e) {
                console.log(e);
                m.reply(`[!] Sorry, this feature is currently problematic.`);
            }
        }
    }
}