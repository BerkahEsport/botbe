export default {
	name: "simi",
	command: ["simi"],
    tags: "fun",
    desc: "Entertainment with Simi that doesn't make sense...",
    customPrefix: "",
    example: "Love you!",
    limit: false,
    isOwner: false,
    isPremium: false,
    isBotAdmin: false,
    isAdmin: false,
    isGroup: false,
    isPrivate: false,
	run: async(m, {
        text,
        axios
    }) => {
        async function simtalk(text) {
            const params = new URLSearchParams();
            params.append("text", text);
            params.append("lc", "id");
            const { data } = await axios({
                method: "POST",
                url: "https://api.simsimi.vn/v2/simtalk",
                data: params,
            });
            return data;
            }

        try {
            let api = await simtalk(text);
            m.reply(api.message, {font: true});
        } catch {
        m.reply("Simi doesn't understand, try asking someone else. 🙁", {font: true});
        }
    }
}