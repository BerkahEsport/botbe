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
    name: ["cekcodid", "cekffid", "cekmlid"],
    command: ["cekcodid", "cekffid", "cekmlid"],
    tags: "info",
    desc: "View game account data via ID.",
    customPrefix: "",
    example: "94954645",
    limit: true,
    isOwner: false,
    isPremium: false,
    isBotAdmin: false,
    isAdmin: false,
    isGroup: false,
    isPrivate: false,
    run: async(m, {
        prefix,
        command,
        args,
        text,
        sock,
        functions,
        axios
    }) => {
        async function stalkCOD(id) {
            return new Promise(async (resolve) => {
                axios.post(
                    "https://api.duniagames.co.id/api/transaction/v1/top-up/inquiry/store",
                    new URLSearchParams({
                        catalogId: 144,
                        gameId: id,
                        itemId: 88,
                        paymentId: 828,
                        productId: 18,
                        product_ref: "CMS",
                        product_ref_denom: "REG"
                            }),
                            {
                            headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            Referer: 'https://www.duniagames.co.id/',
                            Accept: 'application/json',
                                }
                            }).then((response) => {
                                resolve({
                                status: "success",
                                id: id,
                                nickname: response.data.data.gameDetail.userName
                                    })
                                }).catch(() => {
                                resolve({
                                status: "failed",
                                message: 'User id not found!'
                    })
                })
            })
        }

        async function stalkFF(id) {
            return new Promise(async (resolve) => {
                axios.post(
                    'https://api.duniagames.co.id/api/transaction/v1/top-up/inquiry/store',
                    new URLSearchParams(
                    Object.entries({
                    productId: '3',
                    itemId: '353',
                    catalogId: '376',
                    paymentId: '2037',
                    gameId: id,
                    product_ref: 'REG',
                    product_ref_denom: 'AE',
                        })),
                        {
                        headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        Referer: 'https://www.duniagames.co.id/',
                        Accept: 'application/json',
                            },
                        }).then((response) => {
                            resolve({
                            status: "success",
                            id: id,
                            nickname: response.data.data.gameDetail.userName
                            })
                        }).catch(() => {
                        resolve({
                        status: "failed",
                        message: 'User id not found!'
                    })
                })
            })
        }

        async function stalkMLBB(id, zoneId) {
            return new Promise(async (resolve) => {
                axios.post(
                    'https://api.duniagames.co.id/api/transaction/v1/top-up/inquiry/store',
                    new URLSearchParams(
                    Object.entries({
                    productId: '1',
                    itemId: '2',
                    catalogId: '57',
                    paymentId: '352',
                    gameId: id,
                    zoneId: zoneId,
                    product_ref: 'REG',
                    product_ref_denom: 'AE',
                    })),
                        {
                        headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        Referer: 'https://www.duniagames.co.id/',
                        Accept: 'application/json',
                            }
                        }).then((response) => {
                    resolve({
                    status: "success",
                    id: id,
                    server: zoneId,
                    nickname: response.data.data.gameDetail.userName
                        })
                    }).catch(() => {
                    resolve({
                    status: "failed",
                    msg: 'User id or server not found!'
                                })
                            })
                        })
                    }

        if (command === "cekcodid") {
            if (!text) return sock.reply(m.from, "Harap Masukan ID COD", m, { font: true});
            let res = await stalkCOD(text);
            m.reply(functions.list(res.result, "ID COD9"), { font: true});
        }
        if (command === "cekffid") {
            if (!text) return sock.reply(m.from, "Harap Masukan ID FF", m, { font: true});
            let res = await stalkFF(text);
            m.reply(functions.list(res.result, "ID FF"), { font: true});
        }
        if (command === "cekmlid") {
            if (!text) return sock.reply(m.from, "Harap Masukan ID ML.\n\n" +prefix+command+ "94954645 2196", m, { font: true});
            let res = await stalkMLBB(args[0], args[1]);
            m.reply(functions.list(res, "ID MLBB"), { font: true});
        }
    }
}