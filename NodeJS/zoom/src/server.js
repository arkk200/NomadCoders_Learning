import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// fake database
const sockets = [];

// on method는 백엔드에 연결된 사람의 정보를 제공한다.
// 정보는 socket을 통해서 옴

// server.hs에 있는 socket은 연결된 브라우저를 뜻한다.
wss.on("connection", socket => {
    // 연결이 될 때마다 connection이벤트가 일어나고 sockets에 push 됨
    sockets.push(socket);
    console.log("Conneted to Browswer ♬");

    // 브라우저가 다치면 close 이벤트가 감지되고 아래 코드가 실행된다.
    socket.on("close", () => console.log("Disconnted from Browser ※"))

    // 백엔드에서도 메세지를 받을 때 프론트엔드에서 받았던 것처럼 message 이벤트를 쓰면 됨
    socket.on("message", (message) => {
        // 브라우저 배열에서 차례대로 메세지를 보냄
        sockets.forEach(aSocket => aSocket.send(message.toString('utf8')))

        // socket.send(message.toString('utf8'));
    });
    
    // 백엔드에서 메세지를 보냄
    // socket.send("hello");
});

server.listen(3000, handleListen);