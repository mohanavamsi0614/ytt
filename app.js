const express = require('express');
const { YoutubeTranscript } = require("youtube-transcript");
const cors = require('cors');

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/get-transcript', async (req, res) => {
    console.log(req.body);
    const { videoUrl } = req.body;

    if (!videoUrl) {
        return res.status(400).json({ error: 'Video URL is required' });
    }

    try {
        const videoId = new URL(videoUrl).searchParams.get('v');
        if (!videoId) {
            return res.status(400).json({ error: 'Invalid YouTube URL' });
        }

        const transcript = await YoutubeTranscript.fetchTranscript(videoId);
        const text= transcript.map(item => item.text).join(' ');
        res.json({ text });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch transcript', details: error.message });
    }
});

app.listen(5000, () => {
    console.log(`Server is running on http://localhost:5000`);
});
