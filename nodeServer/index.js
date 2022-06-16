// Node Server
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const room = '';

app.get('/', (req, res) => {
    // res.send('<h1>Hello world</h1>');
    __dirname = 'D:\\NodeJs\\Practice Project 2 Chat app\\public'
    res.sendFile(__dirname + '/index.html');
     const room = req.params.room
  });

server.listen(3000, () => {
  console.log('listening on *:3000');
});


const users = {};

io.on('connection', (socket) =>{

    socket.on('new-user-joined', name =>{
        console.log("new user ", name);
        users[socket.id]= name
        socket.to(room).emit('user-joined', name)

    });

    socket.on('send', message =>{
        socket.brodcast.emit('receive', {message: message, name: users[socket.id]})
    });



})
 