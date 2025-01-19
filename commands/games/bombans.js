export default {
    before: async (m, { sock, quoted, functions, user, temp }) => {
        temp = temp || new Map();
        let id = "bomb-"+m.from;
        if (!temp.has(id)) return;

        try {
            let gameData = temp.get(id);
            let [positions, reward, bonus, timer, key, timeout] = gameData;
            if (key === quoted.id) {
                let body = typeof m.body === "string" ? m.body.replace(/[^\d]+/g, "") : false;
                // if (!body || isNaN(body) || parseInt(body) < 1 || parseInt(body) > 9) {
                //     return m.reply("🚩 Select number 1 - 9!");
                // }

                let selectedBox = positions.find(v => v.position == body);
                if (!selectedBox) {
                    return m.reply("🚩 Invalid box. Select a number 1 to 9.", m);
                }

                if (selectedBox.state) {
                    return m.reply(`🚩 The ${selectedBox.number} box is already opened. Select another box.`, m);
                }

                selectedBox.state = true;

                if (selectedBox.emot === "💥") {
                    let teks = `💥 *BOOM!*\n\nBox ${selectedBox.number} contains a bomb!\Penalty: *-${reward} XP*`;
                    user.exp = Math.max(0, user.exp - reward);
                    sock.reply(m.from, teks, m).then(() => {
                        clearTimeout(timer);
                        temp.delete(id);
                    });
                    return;
                }

                let openedBoxes = positions.filter(v => v.state).length;
                if (openedBoxes === positions.length - 1) {
                    let teks = `🎉 Congratulations! All cities are open without being bombed.\Reward:*+${reward + bonus} XP*`;
                    user.exp += reward + bonus;
                    sock.reply(m.from, teks, m).then(() => {
                        clearTimeout(timer);
                        temp.delete(id);
                    });
                    return;
                }
                let teks = `乂 *ʙ ᴏ ᴍ ʙ*\n\nSelect numbers 1 - 9 to open the box:\n`;
                for (let i = 0; i < positions.length; i += 3) {
                    teks += positions.slice(i, i + 3).map(v => (v.state ? v.emot : v.number)).join("") + "\n";
                }
                teks += `\n⏱ Timeout: [ ${(timeout / 1000 / 60).toFixed(1)} menit ]`;
                clearTimeout(timer);
                let timerUpdate = setTimeout(() => {
                    if (temp.has(id)) {
                    let expiredTeks = `⏱️ Time's up!\n\nGame cleared.`;
                    sock.reply(m.from, expiredTeks, m);
                    temp.delete(id);
                    }
                }, timeout);
                let nextMsg = await sock.reply(m.from, teks, m);
                temp.set(id, [positions, reward, bonus, timerUpdate, nextMsg.key.id, timeout]);
            }
        } catch (e) {
            console.error(e);
            m.reply("🚩 There is an error!");
        }
    },
};
