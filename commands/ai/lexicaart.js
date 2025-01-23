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
    name: "lexicaart",
    command: ["lexicaart", "la"],
    tags: "ai",
    desc: "Convert text to image using lexica.art",
    customPrefix: "",
    example: "girl student",
    limit: 3,
    isOwner: false,
    isPremium: false,
    isBotAdmin: false,
    isAdmin: false,
    isGroup: false,
    isPrivate: false,
    run: async(m, {
        text,
        functions
    }) => {
        const images = await( await functions.fetchJson('https://lexica.art/api/v1/search?q=' + text)).images;
        const limit = Math.min(images.length, 5);
        await m.reply(`The results obtained with text: _${text}_ were _${limit.length}_ images.`);
            for (let i = 0; i < limit; i++) {
                m.reply(images[i].src, {mime: "image/jpeg"});
                await functions.delay(3000);
        }
    }
}