// socket.io의 장점 중 하나는 서버를 닫는다면
// 웹 브라우저가 연결을 계속 시도할 수 있게 해준다는 것이다.

const socket = io();

const welcome = document.getElementById('welcome');
const form = welcome.querySelector('form');

function backendDone(msg) {
    console.log(`The backend says: ${msg}`);
}

function handleRoomSubmit(event){
    event.preventDefault();
    const input = form.querySelector('input');

    // socket.io에선 어떤 이벤트든 전송할 수 있다.
    // socket.io의 또다른 장점은 websocket에서 못하던 JS 객체를 보내는 것을 할 수 있다.
    // 또한 메세지를 보낼 때 문자열로 바꿔줄 필요가 없다.
    
    // socket.emit의 인자의 첫번째는 이벤트 명, 그 뒤부턴 다양한 데이터를 보낼 수 있다.
    // 요청이 끝난 뒤 실행할 함수를 쓰고 싶으면 그 함수는 꼭 마지막 인자에 와야 한다.
    // 이 함수는 백엔드에서 실행되면 보안 문제가 생기기에 프론트엔드에서 실행된다.
    // 그렇기에 백은 프론트에서 오는 코드를 실행시키면 안된다.
    socket.emit("enter_room", input.value, backendDone);
    input.value = '';
}

form.addEventListener("submit", handleRoomSubmit);