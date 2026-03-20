const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

let messages = [];

io.on("connection", (socket) => {
    console.log("User connected");

    socket.emit("chat history", messages);

    socket.on("message", (msg) => {
        messages.push(msg);
        io.emit("message", msg);
    });
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

server.listen(0, () => {
    console.log("RUN 👉 http://localhost:" + server.address().port);
});