// 결과적으로 백엔드와 프론트엔드는 이런식으로 만들지 않는다.
// 백에서 프론트엔드의 메세지를 받고 parse한 후 프론트에 문자열 하나를 보내지 않고
// 프론트에 데이터를 보낸 후 프론트에서 parse를 한다.
// parsed.type을 이용하여 case를 여러개 사용하지도 않는다.

import http from "http";
import SocketIO from 'socket.io';
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));


const server = http.createServer(app);
const io = SocketIO(server);

io.on('connection', socket => {
    socket.on('join_room', (roomName) => {
        socket.join(roomName);
        socket.to(roomName).emit('welcome');
    });
    socket.on('offer', (offer, roomName) => {
        socket.to(roomName).emit('offer', offer);
    });
    socket.on('answer', (answer, roomName) => {
        socket.to(roomName).emit('answer', answer);
    })
});

const handleListen = () => console.log(`Listening on http://localhost:3000`);
server.listen(3000, handleListen);