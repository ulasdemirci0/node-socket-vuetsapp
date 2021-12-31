const express = require("express");
const {createServer} = require("http");
const {Server} = require("socket.io");
const app = express();
const httpServer = createServer(app);

const server = new Server(httpServer, {
    cors: "*"
});


server.on("connection", (client) => {
    console.log("Client connected")

    client.on("serverLog", function (data) {
        console.log(data)
        client.emit("clientLog", "Server emit successfully")
    })

    client.on("syncRoom", function (obj = {}) {
        client.join(obj.room)
        client.emit("clientLog", "Joined")
    })

    client.on("sendToRoom", function (obj) {
        client.join(obj.room)
        client.in(obj.room).emit("clientLog", "2li bağlantı");
    })

});
httpServer.listen(3000);
