const socket = io();

const welcome = document.getElementById('welcome');
const form = welcome.querySelector('form');

function handleRoomSubmit(event){
    event.preventDefault();
    const input = form.querySelector('input');

    // socket.io에선 어떤 이벤트든 전송할 수 있다.
    // socket.io의 또다른 장점은 websocket에서 못하던 JS 객체를 보내는 것을 할 수 있다.
    // 또한 메세지를 보낼 때 문자열로 바꿔줄 필요가 없다.
    // 인자로는 (커스텀이벤트명, 보내고 싶은 데이터, 콜백함수)가 들어간다.
    socket.emit("enter_room", {payload: input.value}, () => {
        console.log("server is done!");
    });
    input.value = '';
}

form.addEventListener("submit", handleRoomSubmit);