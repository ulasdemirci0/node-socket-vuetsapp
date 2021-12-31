const express = require("express");
const {createServer} = require("http");
const {Server} = require("socket.io");
const {stringify} = require("nodemon/lib/utils");
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

    client.on("syncRoom", function (room) {
        client.leaveAll();
        if (client.join(room.toString())) {
            client.emit("clientLog", "Joined")
        }
    })

    client.on("sendToRoom", function (obj) {
        let room = ((obj.room) ? `${obj.room}` : false)
        if (room) {
            server.in(room).emit("clientLog", "2li bağlantı");
        }
    });

});
httpServer.listen(3000);
