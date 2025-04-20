console.log("server starting!");
// server.js
const WebSocket = require('ws');
const express = require('express');
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const path = require('path');
function captureScreenshot() {
  const timestamp = Date.now();
  const outputPath = path.join(__dirname, 'screenshots', `screenshot_${timestamp}.jpg`);
  const ffmpeg = spawn('ffmpeg', [
    '-rtsp_transport', 'tcp',
    '-i', RTSP_URL,
    '-vframes', '1',
    outputPath
  ]);
}
const app = express();
console.log("express app started!");

const server = http.createServer(app);
console.log("http server started!");

const wss = new WebSocket.Server({ server });
console.log("websocket server started!");

const RTSP_URL = 'rtsp://192.168.209.23:8554/dummy'; // Replace with your actual stream
wss.on('connection', (ws) => {
  console.log('[WebSocket] Client connected');

  const ffmpeg = spawn('ffmpeg', [
    '-rtsp_transport', 'tcp',
    '-i', RTSP_URL,
    '-f', 'mpegts',
    '-vcodec', 'mpeg1video',
    '-b:v', '1000k', // Adjust bitrate as needed
    '-r', '30',
    'pipe:1'
  ]);

  ffmpeg.stdout.on('data', (chunk) => {
    if (ws.readyState === WebSocket.OPEN) {
      console.log('chunk sent');
      ws.send(chunk);
    }
    console.log('chunk got!');
  });

  ffmpeg.stderr.on('data', (data) => {
    console.error(`[FFmpeg] ${data}`);
  });

  ffmpeg.on('close', () => {
    console.log('[FFmpeg] Process closed');
  });

  ws.on('close', () => {
    ffmpeg.kill('SIGINT');
    console.log('[WebSocket] Client disconnected');
  });
});

// Serve frontend HTML
app.use(express.static('./public/index.html'));

const PORT =3000;
server.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
