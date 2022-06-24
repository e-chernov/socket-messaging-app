const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 3001;
app.use(express.static(path.join(__dirname, '../../build')));
app.get('/', (req, res, next) => res.sendFile(__dirname + './index.html'));
io.on('connection', socket => {
    socket.on('notesChanged', notes => {
        io.emit('newNotes', notes);
    })
});
server.listen(port);