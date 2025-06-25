const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Set your API key here (or use env variable)
const LUMA_API_KEY = process.env.LUMA_API_KEY || "YOUR_LUMA_API_KEY";

app.post('/api/generate', async (req, res) => {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt required" });

    // Step 1: Request generation
    const genRes = await fetch('https://api.lumalabs.ai/dream-machine/v1/generations', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + LUMA_API_KEY,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, aspect_ratio: '16:9' })
    });

    if (!genRes.ok) {
        const err = await genRes.text();
        return res.status(500).json({ error: "Luma API error", details: err });
    }

    const genData = await genRes.json();

    // Step 2: Poll for completion (simple, for demo)
    let attempts = 0;
    let statusData = null;
    while (attempts < 60) { // up to 5 min
        await new Promise(r => setTimeout(r, 5000));
        const statusRes = await fetch(`https://api.lumalabs.ai/dream-machine/v1/generations/${genData.id}`, {
            headers: { 'Authorization': 'Bearer ' + LUMA_API_KEY }
        });
        statusData = await statusRes.json();
        if (statusData.state === 'completed') break;
        if (statusData.state === 'failed') break;
        attempts++;
    }

    if (statusData.state !== 'completed') {
        return res.status(500).json({ error: "Generation failed or timed out", details: statusData });
    }

    // Send video URL and info back
    res.json({
        video: statusData.assets.video,
        prompt,
        id: genData.id
    });
});

// Serve frontend (optional)
app.use(express.static('prototypes/10-LUMA-API'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Luma proxy server running on port ${PORT}`));
