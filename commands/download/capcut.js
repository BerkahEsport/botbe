export default {
    name: "capcut",
    command: ["capcut"],
    tags: "download",
    desc: "Search or Download videos from capcut.",
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
        text,
        sock,
        axios,
        cheerio
    }) => {

function capcutdl(Url) {
	return new Promise((resolve, reject) => {
		let token = Url.match(/\d+/)[0];
		axios({
			url: `https://ssscapcut.com/api/download/${token}`,
			method: 'GET',
			headers: {
				'Accept': '/',
				'User-Agent': 'Mozilla/5.0 (Linux; Android 13; CPH2217 Build/TP1A.220905.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/110.0.5481.153 Mobile Safari/537.36',
				'X-Requested-With': 'acr.browser.barebones',
				'Sec-Fetch-Site': 'same-origin',
				'Sec-Fetch-Mode': 'cors',
				'Sec-Fetch-Dest': 'empty',
				'Referer': 'https://ssscapcut.com/',
				'Accept-Encoding': 'gzip, deflate',
				'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
				'Cookie': 'sign=2cbe441f7f5f4bdb8e99907172f65a42; device-time=1685437999515'
			}
		}).then(({ data }) => {
			console.log(data);
			resolve(data);
		}).catch((err) => {
			console.log(err);
			reject(err);
		});
	});
    }

    let data = await capcutdl(text);
    let caption = `*DOWNLOADER CAPCUT*


*Title:* ${data.title}
*Description:* ${data.description}
*User:* ${data.usage}

${footer}`.trim();
    await sock.sendFile(m.from, data.originalVideoUrl, "capcut", caption, m);
    }
}
