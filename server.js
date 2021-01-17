
const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const moment=require('moment')


app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})

  io.on("connection",(Socket)=>{
      let ads=Socket.handshake.address
      console.log("new connection from__" + ads)

    Socket.on("disconnect",()=>{
      console.log("disconnected") 
    })

    Socket.on("message",(msg)=>{
       const time= moment().format("h:m:a")
        io.emit("data",msg,time,ads) 
    })
})

http.listen(3000,()=>{
    console.log("server connected")
})