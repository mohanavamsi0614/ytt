import { useState } from 'react';
import axios from 'axios';
function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState('');

  const fetchTranscript = async () => {
    setError('');
    setTranscript('');

    try {
      const videoId = new URL(videoUrl).searchParams.get('v');
      if (!videoId) {
        setError('Invalid YouTube URL');
        return;
      }

      const response = await axios.post(`http://localhost:5000/get-transcript`,{videoUrl:videoUrl});

      const data = await response.data;
      console.log(data)
      setTranscript(data.transcript);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="App">
      <h1>YouTube Transcript Fetcher</h1>
      <div>
        <input
          type="text"
          placeholder="Enter YouTube video URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />
        <button onClick={fetchTranscript}>Get Transcript</button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {transcript && (
        <div>
          <h2>Transcript:</h2>
          <p>{transcript}</p>
        </div>
      )}
    </div>
  );
}

export default App;
