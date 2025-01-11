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
  before: async(m, {
    user,
    functions
  }) => {
    let afkmode = functions.random([" ✿.｡.:* 𝒜𝐹𝒦 𝑀𝒪𝒟𝐸 *.:｡.✿", "╰☆☆ ₐFK MₒDₑ ☆☆╮", "░▒▓█ 【A】【F】【K】 【M】【O】【D】【E】 █▓▒░", "▁ ▂ ▄ ▅ ▆ ▇ █ 〜A∿F∿K∿ ∿M∿O∿D∿E〜 █ ▇ ▆ ▅ ▄ ▂ ▁", "【☆】★【☆】★【𝒜𝐹𝒦 𝑀𝒪𝒟𝐸】★【☆】★【☆】" , ".•♫•♬• Å⫶F̊⫶K̊⫶ M̊⫶O̊⫶D̊⫶E̊⫶ •♬•♫•.", "꧁༒☬ A̴F̴K̴ ̴M̴O̴D̴E̴ ☬༒꧂", "§.•¨°÷•..× AFK MODE ×,.•¨°÷•..§", "░▒▓█►─═  ᴀꜰᴋ ᴍᴏᴅᴇ ═─◄█▓▒░", " ✴  🎀  𝒜𝐹𝒦 𝑀❁𝒟𝐸  🎀  ✴", "꧁𓊈𒆜 ƎᗡOW ⋊Ⅎ∀ 𒆜𓊉꧂", "•´¯`•. A͎͍͐￫F͎͍͐￫K͎͍͐￫ M͎͍͐￫O͎͍͐￫D͎͍͐￫E͎͍͐￫ .•´¯`•"]);
    let jids = [...new Set([...(m.mentions || []), ...(m.quoted ? [m.quoted.sender] : [])])];
    for (let jid of jids) {
        let who = global.db.users[jid];
        let afk = who?.afk;
        if (!who) continue;
        if (!afk || afk < 0) continue;
        let reason = who.afkReason || "";
        m.reply(`${ afkmode}
  
╭[ *★彡[DON'T MENTION HIM]彡★* ]✧
┆ ${reason ? "*Reason* : " + reason : "For no apparent reason!"}
┆ *During* : ${functions.runtime(+new Date() - afk)}
╰┅────★`.trim(), {font: true});
    }

        if (user.afk > -1 ) {
            m.reply(`${ afkmode}
      
╭[ *★彡[YOU STOP AFK]彡★* ]✧
┆ *Reasons* : ${user.afkReason ? user.afkReason : ""}
┆ *During* : ${functions.runtime(+new Date() - user.afk)}
╰┅────★`.trim(), {font: true});
        user.afk = -1;
        user.afkReason = "";
    }
  }
}