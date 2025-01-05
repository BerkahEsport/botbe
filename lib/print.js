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

export default async(sock, m, user, config, functions, isCommand, command) => {
    if (m.type === "reactionMessage") return;
    console.log(`
\x1b[36m<=================================>\x1b[39m
📜 \x1b[33mName         :\x1b[39m \x1b[32m${m.pushName}\x1b[39m
📩 \x1b[33mFrom         :\x1b[39m ${m.sender.split('@')[0]}
🥇 \x1b[33mPremium User :\x1b[39m ${m.isPremium ? '\x1b[32mYes\x1b[39m' : '\x1b[31mNo\x1b[39m'}
📦 \x1b[33mType         :\x1b[39m ${m.type}
🕹️ \x1b[33mCommand      :\x1b[39m ${isCommand ? `\x1b[32m${command}\x1b[39m` : '\x1b[31mNo\x1b[39m'}
🎦 \x1b[33mMedia        :\x1b[39m ${m.isMedia ? '\x1b[32mYes\x1b[39m' : '\x1b[31mNo\x1b[39m'}
\x1b[36m<=================================>\x1b[39m
💬 \x1b[33mReply Bot    :\x1b[39m ${typeof m.body === 'string' ? m.body : '\x1b[31mNothing...\x1b[39m.'}
\x1b[36m<=================================>\x1b[39m`);
}