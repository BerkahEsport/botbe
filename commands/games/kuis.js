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
    name: "kuis",
    command: ["kuis", "helpkuis"],
    tags: "games",
    desc: "Guess game kuis.",
    customPrefix: "",
    example: "",
    limit: false,
    isOwner: false,
    isPremium: false,
    isBotAdmin: false,
    isAdmin: false,
    isGroup: false,
    isPrivate: false,
    before: async(m, {
        sock,
        quoted,
        temp,
        user,
        prefix,
        command,
        similarity
    }) => {
        temp = temp || new Map();
        let id = "kuis-" + m.from;
        if (command == "helpkuis") return;
        if (!temp.has(id)) return;
        let room = temp.get(id);
        let [data, question, answer, answered, reward, timer, times] = room;
        let textSender = m.body.toLowerCase().replace(/[^\w\s\-]+/, "");
        let isSurrender = /nyerah|surrender/i.test(m.body);
        if (!isSurrender) {
            let index = answer.indexOf(textSender);
            if (answered[index]) return;
            answered[index] = m.sender;
            user.exp += reward;
        }
        let isWin = answered.length === answered.filter(v => v).length;
        let caption = `
${question}

${isWin ? `*ALL QUESTION ARE COMPLETED!*` : isSurrender ? "*GIVE UP!*" : ""}
${Array.from(answer, (v, i) => {
    return isSurrender || answered[i]
        ? `(${i + 1}) ${v} ${
            answered[i]
                ? "@" + answered[i].split("@")[0]
                : ""
        }`.trim()
        : false;
})
    .filter(v => v)
    .join("\n")}
${isSurrender ? "" : `+${reward} EXP for each correct answer`}`.trim();
        const msg = await sock.reply(m.from, caption, m);
        data = msg;
        if (isWin || isSurrender) temp.delete(id);
        return;
    },
    run: async(m, {
        sock,
        functions,
        temp,
        prefix,
        command
    }) => {
        temp = temp || new Map();
        const id = "kuis-"+m.from;
        switch (command) {
            case "kuis":
                if (temp.has(id)) {
                    return m.reply("🚩 Game kuis in progress!");
                }
                const result = await functions.api("api/kuis");
                const timeout = 60000;
                const times = functions.timer(timeout);
                const reward = functions.randomInt(1, 100);
                const answer = result.result.jawaban;
                const answered = Array.from(answer, () => false);
                const question = `❓ *Question*: ${result.result.soal}\nThere are *${answer.length}* answers ${ answer.find(v => v.includes(" ")) ? `(some answers contain spaces)`: ""}\n\n💡 *Clue*:Type *${prefix}helpkuis* for help.\n⏱️ *Timer*: ${times}.`;
                const data = await sock.reply(m.from, question, m);
                const timer = setTimeout(() => {
                    if (temp.has(id)) {
                        temp.delete(id);
                        const expiredTeks = `⏱️ Time's up!\n\n🗑️ Game kuis cleared.`;
                        sock.reply(m.from, expiredTeks, m);
                    }
                }, timeout);
                temp.set(id, [data, question, answer, answered, reward, timer, times]);
            break;
            case "helpkuis":
                if (temp.has(id)) {
                    const gameData = temp.get(id);
                    const [data, question, answer] = gameData;
                    const clue = answer.map((v, i) => `${i+1}. ${v.replace(/[AIUEO]/gi, "_")}`).join("\n");
                    sock.reply(m.from, question + "\n\n🔍 *Instruction:*\n\n```" + clue + "```", data);
                } else {
                    m.reply('❌ There are no ongoing issues in this chat.');
                    throw false;
                }
            break;
        }
    }
}