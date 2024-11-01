// Big imports

import { createRequire } from 'module';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// Minor imports

import express from "express";
import http from "http";

const require = createRequire(import.meta.url);

const socketIo = require('socket.io');

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)
const app = express();
const path =  require("path");
const PORT = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

app.use(express.json());

const server = http.createServer(app);
const io = socketIo(server);


// On connection
io.on('connection', (socket) => {
  console.log('user connected')

  socket.on('ask', async (data) => {
    const prompt = data.prompt;
    console.log(prompt)
    const result = await model.generateContent(prompt);
    const answer = result.response.text()
    socket.emit('test', {answer});
    
  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
  })

})



server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});



app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});