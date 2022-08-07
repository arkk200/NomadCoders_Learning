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

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);
const io = SocketIO(server);

function publicRooms() {
    // io.sockets.adapter에는 sides와 rooms가 있는데
    // rooms에서 sids에 없는 키는 public, 그렇지 않다면
    // 서버와 브라우저간의 대화하는 private 아이디를 의미한다.
    const {sockets: {adapter: {sids, rooms}, }, } = io;
    const publicRooms = [];
    rooms.forEach((_, key) => {
        // JS에서 Map은 key, value값이 들어간다.
        // .set을 이용해서 (key, value)를 설정할 수 있고
        // .get을 이용해서 (key)로 value를 가져올 수 있다.
        if (sids.get(key) === undefined){
            publicRooms.push(key);
        }
    });
    return publicRooms;
}

io.on("connection", socket => {
    // 새로 접속한 사람에게 생성되어 있는 방을 표시해줌
    io.sockets.emit("room_change", publicRooms());
    socket['nickname'] = 'Anon';
    socket.onAny(event => {
        console.log(io.sockets.adapter);
        console.log(`Socket Event: ${event}`);
    });
    socket.on("enter_room", (roomName, done) => {
        socket.join(roomName);
        done();
        socket.to(roomName).emit("welcome", socket.nickname);
        // io.sockets.emit()은 모든 socket에 메세지를 보낸다.
        io.sockets.emit("room_change", publicRooms());
    });
    socket.on("disconnecting", () => {
        socket.rooms.forEach(room => socket.to(room).emit("bye", socket.nickname));
    });
    socket.on("disconnect", () => {
        io.sockets.emit("room_change", publicRooms());
    });
    socket.on('new_message', (msg, room, done) => {
        socket.to(room).emit("new_message", `${socket.nickname}: ${msg}`);
        done();
    });
    socket.on('nickname', nickname => socket["nickname"] = nickname);
});

/*
const wss = new WebSocket.Server({ server });

const sockets = [];

wss.on("connection", socket => {
    sockets.push(socket);

    socket["nickname"] = "Anon";
    
    console.log("Conneted to Browswer ♬");

    socket.on("close", () => console.log("Disconnted from Browser ※"))

    socket.on("message", (msg) => {
        const message = JSON.parse(msg.toString('utf8'));
        switch (message.type){
            case "new_message":
                sockets.forEach(aSocket => aSocket.send(`${socket.nickname}: ${message.payload}`));
                break;
            case "nickname":
                socket["nickname"] = message.payload;
                break;
        }
    });
});
*/

server.listen(3000, handleListen);