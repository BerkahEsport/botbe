/*<============== CREDITS ==============>
	Author: @berkahesport
	Contact me: 62895375950107
    Website: https://berkahesport.my.id/
	
	Do not delete the source code.
	It is prohibited to sell and buy
	WhatsApp BOT scripts
	without the knowledge
	of the script owner.
	
	Selling = Sin 
	
	Thank you to Allah S.W.T
<============== CREDITS ==============>*/

export default async function group_participants(sock, message, config, functions) {
   try {
      let { id, participants, action, author } = message;
      if (participants.includes(sock.user.jid) && (action == "remove" || action == "leave")) return;
      const metadata = await sock.groupMetadata(id);
      for (const jid of participants) {
         let profile;
         try {
            profile = await sock.profilePictureUrl(jid, "image");
         } catch {
            profile = "https://telegra.ph/file/ed3144572e1b6a0dc2b64.png";
         }

/* <============== ACTION ==============> */
if (action == "add" || action == "invite") {
      await sock.sendMessage(id, {
         text: `❖━━━━━[ ᴡᴇʟᴄᴏᴍᴇ ]━━━━━❖

┏––––––━━━━━━━•
│☘︎ ${metadata.subject}
┣━━━━━━━┅┅┅
│( 👋 Hello @${jid.split("@")[0]})
┗––––––━━┅┅┅
––––––┅┅ ᴅᴇsᴄʀɪᴘᴛɪᴏɴ ┅┅––––––
${metadata?.desc || "Nothing Description!"}

> From: @${author.split`@`[0]}
––––––┅┅ ${config.name.bot} ┅┅––––––`.trim(), contextInfo: {
                  mentionedJid: [jid],
                  externalAdReply: {
                     title: config.name.bot,
                     mediaType: 1,
                     previewType: 5,
                     renderLargerThumbnail: true,
                     thumbnailUrl: profile,
                     sourceUrl: config.group.ofc
                  }
               }
            })
        }
    }
} catch (e) {
      console.log("Error Group Participants:", e);
   } return;
}