var app = require('express')()
var http = require("http").Server(app)
var socket = require("socket.io")(http)
var cors = require("cors")
import SocketHandler from './handler/SocketHandler'

app.use(cors())

socket.on('connection',(socket)=>{
    let handler = new SocketHandler(socket)
})

app.listen(3000,()=>{
    console.log("Socket Server Started")
})


