const express = require('express');
const http = require('http');
const { Server } = require("socket.io");


const app = express();
const server = http.createServer(app);
const io = new Server(server , {
    cors : {
        origin : '*'
    }
});
 
let users = [];

const addUser = (userData , socketID)=>{
  !users.some(user => user.email == userData.email)  && users.push({...userData , socketID})
} 

const removeUser = (socketID)=>{
  users = users.filter(user => user.socketID != socketID);
}


io.on('connection', (socket) => {
    console.log('a user connected'); 
    //concet
  socket.on("addusers" , (userData)=>{
      addUser(userData , socket.id);
      io.emit("getUsers", users)
    })


    //send chat
    socket.on("chat"  , (payload)=>{
      io.emit("chat" , payload)
    })


  //disconnect
      socket.on('disconnect', () => {
        console.log('user disconnected');
        removeUser(socket.id);
        io.emit('getUsers', users);
    })


  });


  server.listen(5000 , ()=>{console.log("server is runing on the port 5000...")})