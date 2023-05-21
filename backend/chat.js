const express = require('express');
const app = express();
const http = require('http').createServer(app); 
const io = require('socket.io')(http);
const chatRoutes = require('./routes/socket.js');

app.use(express.json());

// Add middleware to set CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/api/chat', chatRoutes);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

http.listen(3001, () => {
  console.log('Server running on port 3001');
});