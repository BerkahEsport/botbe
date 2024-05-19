import { pinterest } from "../../lib/js/pinterest.js";
export default {
	name: "pinterest",
	command: ["pinterest", "pint"],
    tags: "images",
    desc: "Looking for 10 random images from Pinterest...",
	run: async(m, { sock, config, functions, text}) => {
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
},
customPrefix: "",
example: "%prefix%command one piece",
limit: 2,
isOwner: false,
isPremium: false,
isBotAdmin: false,
isAdmin: false,
isGroup: false,
isPrivate: false
}