const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");

// websocket은 ws로 주소가 시작해야 한다.
// 또한 모바일에선 localhost가 존재하지 않으므로
// window.location.host를 써서 브라우저의 위치를 나타내준다.
// window.location.host를 쓰면 포트 번호가 바뀌어도 작동한다.

// app.js의 socket은 서버로의 연결을 뜻한다.
const socket = new WebSocket(`ws://${window.location.host}`);

// socket이 connection을 open 했을 때 이벤트 발생
socket.addEventListener('open', () => {
    console.log("Conneted to Server ♬");
});

// 백엔드에서 오는 메세지를 감지
socket.addEventListener('message', message => {
    // 프론트엔드에서 메세지를 받음
    console.log("New message: ", message.data);
});

socket.addEventListener('close', () => {
    console.log("Disconnted from Server ※")
});

/*
setTimeout(() => {
    // 프론트엔드에서도 메세지를 보낼 때 백엔드에서 보냈던 것처럼 하면 됨
    socket.send("hello from the browser");
}, 10000);
*/

function handleSubmit(event) {
    event.preventDefault();
    const input = messageForm.querySelector('input');
    socket.send(input.value);
    // console.log(input.value);
    input.value = '';
}

messageForm.addEventListener('submit', handleSubmit);