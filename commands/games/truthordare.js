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
    name: [ "truth", "dare"],
    command: [ "truth", "dare"],
    tags: "games",
    desc: "Truth or Dare is one of the fun games that can be played with friends. To make the game more fun, a list of fun Truth or Dare questions needs to be known before starting the game.",
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
        functions
    }) => {
        switch (command) {
            case "truth": {
                const data = await functions.api("api/thruth");
                m.reply(data.result);
            }
            break;
            case "dare": {
                const data = await functions.api("api/dare");
                m.reply(data.result);
            }
            break;
            default:
                break;
        }
    }
}