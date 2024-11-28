export default {
    name: "lahelu",
    command: ["lahelu"],
    tags: "others",
    desc: "Search for a specific video from the Lahelu site.",
    customPrefix: "",
    example: "query.page.part",
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
        functions
      }) => {
        const parts = text.trim().split(".").map(item => item.trim());
        const query = parts[0];
        const page = parseInt(parts[1]) || 0;
        const part = parseInt(parts[2]) || 1;
        const url = `https://lahelu.com/api/post/get-search?query=${query}&page=${page}`;
        try {
          const data = await functions.fetchJson(url);
          if (data.postInfos && data.postInfos.length > 0) {
            if (part > 0 && part <= data.postInfos.length) {
              const result = data.postInfos[part - 1];
              const message = `📌 *Post ID:* ${result.postID}
👤 *User ID:* ${result.userID}
📜 *Title:* ${result.title}
👍 *Total Upvotes:* ${result.totalUpvotes}
👎 *Total Downvotes:* ${result.totalDownvotes}
💬 *Total Comments:* ${result.totalComments}
⏰ *Create Time:* ${new Date(result.createTime).toLocaleString()}
🖼️ *Media:* ${result.media}
🚫 *Sensitive:* ${result.sensitive ? "Yes" : "No"}
🧑‍💼 *User Username:* ${result.userUsername}
\n📚 Example usage: *lahelu query.page.part*`;
      sock.sendFile(m.from, result.media.includes("lahelu.com") ? result.media : `https://cache.lahelu.com/${result.media}`, "", message, m);
            } else if (page > 0) {
              const listMessage = data.postInfos
                .map((post, index) => `*${index + 1}.* ${post.title}`)
                .join("\n");
              const helpMessage = `\n\n📚 Example usage: *lahelu query.page.part*`;
              sock.reply(m.from, listMessage + helpMessage, m);
            } else {
              sock.reply(m.from, "❌ Invalid part number. Please enter the correct part number.\n\n📚 Example usage: *lahelu query.page.part*", m);
            }
          } else {
            sock.reply(m.from, "📭 No results found.", m);
          }
        } catch (error) {
          console.error("An error occurred:", error);
          m.reply("❌ An error occurred while fetching data. Ensure the input format is correct.\n\n📚 Example usage: *lahelu query.page.part*", m);
        }
  }
}