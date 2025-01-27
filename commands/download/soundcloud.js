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
    name: "soundcloud",
    command: ["soundcloud"],
    tags: "download",
    desc: "",
    customPrefix: "",
    example: "https://soundcloud.com/sheshizm2/alan-walker-faded-original-copy",
    limit: 4,
    isOwner: false,
    isPremium: false,
    isBotAdmin: false,
    isAdmin: false,
    isGroup: false,
    isPrivate: false,
    run: async(m, {
        args,
        sock,
        functions
      }) => {
      const data = await functions.api("api/soundcloud", args[0]);
      await sock.sendFile(m.from, data.result.link, "", data.result.info, m);
  }
}