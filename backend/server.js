// /backend/server.js
const express = require("express");
const cors = require("cors");
const { spawn } = require("child_process");
const path = require("path");

const app = express();
const port = 3001;
app.use(cors());

app.use('/hls', express.static(path.join(__dirname, 'public/hls')));

// (optional) Enable CORS for React on different ports:
app.use((req, res, next) => {
res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Spawn the FFmpeg to read RTSP and encode to HLS
const rtspUrl = 'rtsp://10.157.85.106:8554/dummy';
const hlsOutput = path.join(__dirname, 'public/hls', 'index.m3u8');

const FFmpeg = spawn("ffmpeg", [
  '-rtsp_transport', 'tcp',
  '-re',
  '-i', rtspUrl,
  '-c:v', 'copy',
  '-c:a', 'aac',
  '-f', 'hls',
  '-hls_time', '2',
  '-hls_list_size', '5',
  '-hls_flags', 'delete_segments+omit_endlist',
  '-hls_flags', 'program_date_time',
  hlsOutput,
]);

FFmpeg.stderr.on('data', d => console.error('FFmpeg:', d.toString()));
FFmpeg.on('exit', code => console.log('FFmpeg exited with code', code));

//Start the server
app.listen(port, () => {
  console.log(`RTSP→HLS server listening at http://localhost:${port}/hls/index.m3u8`);
});