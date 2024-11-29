export default {
    name: "ytmp4",
    command: ["ytmp4"],
    tags: "download",
    desc: "Download file mp4 with link youtube...",
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
        const data = new URLSearchParams({ videoid: match[1], downtype: "mp4", vquality: "480" });
        const response = await axios.post('https://api-cdn.saveservall.xyz/ajax-v2.php', data, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        });
        const dl = response.data.url;
        const filename = response.data.filename;
        await sock.sendFile(m.from, dl, filename, "", m, {asDocument: true});
        }
    }
