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

import { exec } from "child_process";
export default {
  name: "$",
  command: [""],
  customPrefix: "$",
  tags: "owner",
  desc: "Executing system...",
  example: "",
  isOwner: true,
  isBotAdmin: false,
  isAdmin: false,
  isGroup: false,
  isPrivate: false,
  isPremium: false,
  run: async (m, {functions}) => {
    try {
      exec(m.text, async (err, stdout) => {
        if (err) return m.reply(functions.format(err));
        if (stdout) return m.reply(functions.format(stdout));
      });
    } catch (e) {
      m.reply(functions.format(e));
    }
  }
}