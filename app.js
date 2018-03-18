var app = require('express')
var http = require("http").Server(app)
var socket = require("socket.io")(http)
import SocketHandler from './handler/SocketHandler'
socket.on('connection',(socket)=>{
    let handler = new SocketHandler(socket)
})

http.listen(5000,()=>{
    console.log("Socket Server Started : " + http.address().port)
})


