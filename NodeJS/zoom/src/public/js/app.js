// socket.io의 장점 중 하나는 서버를 닫는다면
// 웹 브라우저가 연결을 계속 시도할 수 있게 해준다는 것이다.

const socket = io();

const welcome = document.getElementById('welcome');
const form = welcome.querySelector('form');
const room = document.getElementById('room');

room.hidden = true;

let roomName;

function addMessage(msg) {
    const ul = room.querySelector('ul');
    const li = document.createElement('li');
    li.innerText = msg;
    ul.appendChild(li);
}

function handleMessageSubmit(event){
    event.preventDefault();
    const input = room.querySelector('#msg input');
    const value = input.value;
    socket.emit("new_message", value, roomName, () => {
        addMessage(`You: ${value}`);
    });
    input.value = '';
}

function handleNicknameSubmit(event) {
    event.preventDefault();
    const input = room.querySelector('#name input');
    socket.emit('nickname', input.value);
}

function showRoom() {
    welcome.hidden = true;
    room.hidden = false;
    // room에 있는 h3에 roomName을 적음
    const h3 = room.querySelector('h3');
    h3.innerText = `Room ${roomName}`;
    const msgForm = room.querySelector('#msg');
    const nameForm = room.querySelector('#name');
    msgForm.addEventListener('submit', handleMessageSubmit);
    nameForm.addEventListener('submit', handleNicknameSubmit);
}

function handleRoomSubmit(event){
    event.preventDefault();
    const input = form.querySelector('input');
    socket.emit("enter_room", input.value, showRoom);
    roomName = input.value;
    input.value = '';
}

form.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", (user) => {
    addMessage(`${user} arrived!`);
});

socket.on("bye", (left) => {
    addMessage(`${left} left ㅠㅠ`);
});

// 두번째 인자는 msg => {addMessage(msg);} 랑 같음
socket.on("new_message", addMessage);

// 얘의 두번째 인자도 마찬가지로 msg => {console.log(msg);} 랑 같음
socket.on("room_change", (rooms) => {
    const roomList = welcome.querySelector('ul');
    roomList.innerHTML = '';
    if(rooms.length === 0) { return; }
    rooms.forEach(room => {
        const li = document.createElement('li');
        li.innerText = room;
        roomList.appendChild(li);
    });
});