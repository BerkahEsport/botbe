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

import { pinterest } from "../../lib/js/pinterest.js";
export default {
	name: "pinterest",
	command: ["pinterest", "pint"],
  tags: "images",
  desc: "Looking for 10 random images from Pinterest...",
  customPrefix: "",
  example: "one piece",
  limit: 2,
  isOwner: false,
  isPremium: false,
  isBotAdmin: false,
  isAdmin: false,
  isGroup: false,
  isPrivate: false,
	run: async(m, {
    sock,
    text,
    functions,
    api,
    config
  }) => {
    try {
      const data = await pinterest(text);
      let images = data.slice(0, 10);

      for (let i = images.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [images[i], images[j]] = [images[j], images[i]];
      }
      for (let i = 0; i < 10; i++) {
        let imageUrl = images[i];
        await sock.sendFile(m.from, imageUrl, "Pinteres", imageUrl, m);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (e) {
      console.error(e);
      const data = await functions.fetchJson(`${api}api/pinterest?text=${text}&apikey=${config.setting.apikey}`);
      let images = data.result.slice(0, 10);

      for (let i = images.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [images[i], images[j]] = [images[j], images[i]];
      }
      for (let i = 0; i < 10; i++) {
        let imageUrl = images[i];
        await sock.sendFile(m.from, imageUrl, "Pinteres", imageUrl, m);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }
}