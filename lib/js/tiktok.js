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

import axios from 'axios';
export default async(URL) => {
    return new Promise(async (resolve, rejecet) => {
        let {
            data
        } = await axios.request({
            url: "https://lovetik.com/api/ajax/search",
            method: "POST",
            data: new URLSearchParams(Object.entries({
                query: URL
            }))
        })
        let result = {
            desc: data.desc,
            author: data.author,
            author_name: data.author_name,
            cover: data.cover,
            video: data.play_url,
            audio: data.links[4].a || "".replace("https", "http")
        }
        resolve(result)
    })
}
