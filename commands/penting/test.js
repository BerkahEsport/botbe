import axios from "axios";
export default {
	name: "test",
	command: ["test", "testing"],
    tags: "main",
    desc: "Testing command...",
	run: async(m, { text, sock, config, functions}) => {
		let { data } = await axios(text, {
			headers: {
			   "Accept": "application/json, text/plain, */*",
			   "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36 Edg/121.0.0.0",
			   },
			responseType: "json",
			
		 });
		 console.log(data);},
customPrefix: "",
example: "",
limit: false,
isOwner: false,
isPremium: false,
isBotAdmin: false,
isAdmin: false,
isGroup: false,
isPrivate: false
}