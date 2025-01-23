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
    name: "ytv",
    command: ["ytv"],
    tags: "download",
    desc: "Download video file with link youtube...",
    customPrefix: "",
    example: "https://youtu.be/jySbH-dLrYA",
    limit: 10,
    isOwner: false,
    isPremium: false,
    isBotAdmin: false,
    isAdmin: false,
    isGroup: false,
    isPrivate: false,
    run: async(m, {
        text,
        sock,
        functions,
        axios
    }) => {
        if (!functions.isUrl(text, "youtu")) throw ("Enter the YouTube URL correctly!");
        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/]+\/\S+\/|(?:v|e(?:mbed)?)\/|(?:.*?[?&]v=))|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = text.match(regex);
        const data = new URLSearchParams({ videoid: match[1], downtype: "mp4", vquality: "360" });
        const response = await axios.post('https://api-cdn.saveservall.xyz/ajax-v2.php', data, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        });
        const dl = response.data.url;
        const filename = response.data.filename;
        await sock.sendFile(m.from, dl, filename, "", m);
        }
    }