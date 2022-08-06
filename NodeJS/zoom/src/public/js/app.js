const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");

function makeMessage(type, payload) {
    const msg = { type, payload };
    return JSON.stringify(msg);
}

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
    const li = document.createElement('li');
    li.innerText = message.data;
    messageList.append(li);
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

    // 백엔드에 보내는 타입이 2가지인 경우 JSON object 형식으로
    // type을 추가하여 백엔드에 보낸다. 단, 보낼 땐 문자열 형태로 보냄
    socket.send(makeMessage("new_message", input.value));
    // console.log(input.value);
    input.value = '';
}

function handleNickSubmit(event) {
    event.preventDefault();
    const input = nickForm.querySelector('input');

    // JSON 형태로 파일 보내는 까닭은 Go, Java 등등의 언어로 도는 백엔드는
    // Javascript 오브젝트를 이해하지 못하기 때문이다.
    socket.send(makeMessage("nickname", input.value));
    input.value = '';
}

messageForm.addEventListener('submit', handleSubmit);
nickForm.addEventListener('submit', handleNickSubmit);