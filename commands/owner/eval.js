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

export default {
  name: ">",
  command: [""],
  customPrefix: ["*", ">"],
  tags: "owner",
  desc: "Eval checker!",
  run: async (m, argument) => {
    // Dont delete this bottom code
    let {
        prefix,
        noPrefix,
        command,
        arg,
        args,
        text,
        sock,
        commands,
        cmd,
        name,
        user,
        quoted,
        settings,
        isGroup,
        isAdmin,
        isBotAdmin,
        admin,
        metadata,
        participants,
        store,
        config,
        functions
    } = argument
    let evalCmd;
    try {
      evalCmd = prefix.includes("*")
        ? eval("(async() => { " + noPrefix + " })()")
        : await eval(noPrefix);
    } catch (e) {
      m.reply(functions.format(e));
    }
    new Promise(async (resolve, reject) => {
      try {
        resolve(evalCmd);
      } catch (err) {
        reject(err);
      }
    })
      ?.then((res) => {console.log(res)
        m.reply(functions.format(res))})
      ?.catch((err) => {console.log(err)
         m.reply(functions.format(err))});
  },
example: "",
isOwner: true,
isBotAdmin: false,
isAdmin: false,
isGroup: false,
isPrivate: false,
isPremium: false,
}