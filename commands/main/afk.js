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
    name: "afk",
    command: ["afk"],
    tags: "main",
    desc: "A person is not in front of the computer or device being used, so cannot respond to messages or interactions directly.",
    customPrefix: "",
    example: "sleep!",
    limit: false,
    isOwner: false,
    isPremium: false,
    isBotAdmin: false,
    isAdmin: false,
    isGroup: false,
    isPrivate: false,
    run: async(m, {
        text,
        user,
        functions
      }) => {
      user.afk = Date.now();
      user.afkReason = text|| "";
      let afkmode = functions.random([" ✿.｡.:* 𝒜𝐹𝒦 𝑀𝒪𝒟𝐸 *.:｡.✿", "╰☆☆ ₐFK MₒDₑ ☆☆╮", "░▒▓█ 【A】【F】【K】 【M】【O】【D】【E】 █▓▒░", "▁ ▂ ▄ ▅ ▆ ▇ █ 〜A∿F∿K∿ ∿M∿O∿D∿E〜 █ ▇ ▆ ▅ ▄ ▂ ▁", "【☆】★【☆】★【𝒜𝐹𝒦 𝑀𝒪𝒟𝐸】★【☆】★【☆】" , ".•♫•♬• Å⫶F̊⫶K̊⫶ M̊⫶O̊⫶D̊⫶E̊⫶ •♬•♫•.", "꧁༒☬ A̴F̴K̴ ̴M̴O̴D̴E̴ ☬༒꧂", "§.•¨°÷•..× AFK MODE ×,.•¨°÷•..§", "░▒▓█►─═  ᴀꜰᴋ ᴍᴏᴅᴇ ═─◄█▓▒░", " ✴  🎀  𝒜𝐹𝒦 𝑀❁𝒟𝐸  🎀  ✴", "꧁𓊈𒆜 ƎᗡOW ⋊Ⅎ∀ 𒆜𓊉꧂", "•´¯`•. A͎͍͐￫F͎͍͐￫K͎͍͐￫ M͎͍͐￫O͎͍͐￫D͎͍͐￫E͎͍͐￫ .•´¯`•"]);
      m.reply(`${ afkmode}
    
      ╭[ *★彡[YOU ARE NOW AFK]彡★* ]✧
      ┆ *Name*   : ${m.pushName || user.name}
      ┆ *Reason* : ${user.afkReason ? "" + user.afkReason : ""}
      ╰┅────────★`, {font: true});
  }
}