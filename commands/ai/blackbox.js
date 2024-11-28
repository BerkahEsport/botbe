export default {
    name: "blackbox",
    command: ["blackbox", "bb"],
    tags: "ai",
    desc: "Q&A with blackbox ai.",
    customPrefix: "",
    example: "Who are you?",
    limit: false,
    isOwner: false,
    isPremium: false,
    isBotAdmin: false,
    isAdmin: false,
    isGroup: false,
    isPrivate: false,
    run: async(m, {
        quoted,
        axios
    }) => {
    async function blackbox(message) {
        try {
            const response = await axios.post('https://www.blackbox.ai/api/chat', {
            messages: [{ id: null, content: message, role: 'user' }],
            id: null,
            previewToken: null,
            userId: null,
            codeModelMode: true,
            agentMode: {
                "mode": true,
                "id": "BerkahEsportHzjeJFO",
                "name": "BerkahEsport"
            },
            trendingAgentMode: {},
            isMicMode: false,
            isChromeExt: false,
            githubToken: null
            });
            let filteredResponse = response.data.replace(/\$@\$v=(v1\.21|undefined)-rv1\$@\$/g, '');
            return filteredResponse;
        } catch (error) {
            throw error;
        }
    }
    const response = await blackbox(quoted.text);
    m.reply(response);
    }
}