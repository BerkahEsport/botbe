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

// Don't change the name of the register.js file, otherwise the bot script will have problems.
export default {
	name: "register",
        command: ["register", "reg"], // do not change this part.
        tags: "main",
        desc: "Register your number in the bot database.",
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
                prefix,
                command,
                text,
                user,
                config,
                functions
        }) => {
                if (!user) return;
                const regTime = Date.now();
                let [ name, age ] = text.split(".");
                if ( user?.registered === true ) throw (`You are already registered in the bot database!`);
                if ( !text) throw (`Please enter the command correctly. \nExample: ${prefix+command} ${m.pushName || "userBE"}.18`);
                if ( !name ) throw ("Name cannot be empty (Alphanumeric)!");
                if ( !age ) throw ("Age cannot be empty (Number)!");
                if ( parseInt( age ) > 30 ) throw ("Age must not be more than 30!");
                if ( parseInt( age ) < 7 ) throw ("Age must not be less than 7!");
                        //  Add if you are
                        user.registered = true;
                        user.registeredTime = +regTime;
                        user.premium = false;
                        user.premiumTime = 0;
                        user.limit = 10;
                        user.name = name;
                        user.age = parseInt( age );
        m.reply(`*「 REGISTERED 」*

┏─• *USER BOT*
│▸ *STATUS:* ☑️ SUCCESS
│▸ *NAME:* ${ name }
│▸ *AGE:* ${ age } year
│▸ *LIMIT:* 10
│▸ *DATE:* ${functions.msToDate(regTime)}
┗────···

> ${config.name.bot || sock.user.name}`, {font: true});
        }
}