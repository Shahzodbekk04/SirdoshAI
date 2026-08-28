export default async function handler(req, res) {
    // Faqat POST so'rovlarni qabul qilamiz
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Faqat POST ruxsat etilgan' });
    }

    // Vercel'dagi yashirin API kalitni olamiz
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: "Serverda API kalit sozlanmagan!" });
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

    try {
        // So'rovni Gemini ga yuboramiz
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
        });

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}