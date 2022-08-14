const socket = io();

const myFace = document.getElementById('myFace');
const muteBtn = document.getElementById('mute');
const cameraBtn = document.getElementById('camera');
const cameraSelect = document.getElementById('cameras');

const call = document.getElementById("call");

call.hidden = true;

let myStream;
let muted = false;
let cameraOff = false;
let roomName;
let myPeerConnection;

async function getCameras(){
    try{
        const devices = await navigator.mediaDevices.enumerateDevices();
        const cameras = devices.filter(device => device.kind === 'videoinput');
        const currentCamera = myStream.getVideoTracks()[0];
        cameras.forEach(camera => {
            const option = document.createElement('option');
            option.value = camera.deviceId;
            option.innerText = camera.label;
            // 현재 선택된 카메라를 감지하고 선택함
            if(currentCamera.label == camera.label)
                option.selected = true;
            cameraSelect.appendChild(option);
        })
    } catch (e){
        console.log(e);
    }
}

async function getMedia(deviceId){
    // deviceId가 없을 때 실행
    const initialConstrains = {
        audio: true,
        video: {facingMode: "user"}
    }
    // deviceId가 있을 때 실행
    const cameraConstraints = {
        audio: true,
        video: {deviceId: {exact: deviceId}}
    }
    try {
        myStream = await navigator.mediaDevices.getUserMedia(
            deviceId ? cameraConstraints : initialConstrains
        );
        myFace.srcObject = myStream;
        if(!deviceId) // 카메라 복사 방지
            await getCameras();
    } catch (e) {
        console.log(e);
    }
}

function handleMuteClick(){
    // 눌릴 때마다 track.enabled를 정반대로 만듦
    myStream.getAudioTracks().forEach(track => (track.enabled = !track.enabled));
    if(!muted){
        muteBtn.innerText = "Unmute";
        muted = true;
    } else {
        muteBtn.innerText = "Mute";
        muted = false;
    }
}
function handleCamereClick(){
    myStream.getVideoTracks().forEach(track => (track.enabled = !track.enabled));
    if(cameraOff){
        cameraBtn.innerText = "Turn Camera Off";
        cameraOff = false;
    } else {
        cameraBtn.innerText = "Turn Camera On";
        cameraOff = true;
    }
}

async function handleCameraChange(){
    await getMedia(cameraSelect.value);
    if(myPeerConnection){ // 카메라 바꾸는 것도 상대 브라우저에 반영되게 함
        const videoTrack = myStream.getVideoTracks()[0];
        const videoSender = myPeerConnection.getSenders().find(sender => sender.track.kind === "video");
        videoSender.replaceTrack(videoTrack);
    }
}

muteBtn.addEventListener('click', handleMuteClick);
cameraBtn.addEventListener('click', handleCamereClick);

cameraSelect.addEventListener('input', handleCameraChange);

// Welcome Form (join a room)

const welcome = document.getElementById("welcome");
welcomeForm = welcome.querySelector('form');

async function initCall(){
    welcome.hidden = true;
    call.hidden = false;
    await getMedia();
    makeConnection();
}

async function handleWelcomeSubmit(event){
    event.preventDefault();
    const input = welcomeForm.querySelector('input');
    // web socket의 속도가 media를 가져오는 속도보다 빠르기에
    // initCall을 먼저 호출해줌
    await initCall();
    socket.emit('join_room', input.value);
    roomName = input.value;
    input.value = '';
}

welcomeForm.addEventListener('submit', handleWelcomeSubmit);

// Socket Code

// Peer A에서만 실행
socket.on('welcome', async () => {
    const offer = await myPeerConnection.createOffer();
    myPeerConnection.setLocalDescription(offer);
    console.log('sent the offer');
    socket.emit('offer', offer, roomName);
});

// Peer B에서만 실행
socket.on('offer', async (offer) => {
    console.log('received the offer');
    myPeerConnection.setRemoteDescription(offer);
    const answer = await myPeerConnection.createAnswer();
    myPeerConnection.setLocalDescription(answer);
    socket.emit('answer', answer, roomName);
    console.log('sent the answer');
});

// Peer A에서 remoteDescription을 가짐
socket.on('answer', answer => {
    console.log('recieved the answer');
    myPeerConnection.setRemoteDescription(answer);
});

socket.on('ice', ice => {
    console.log('received candidate');
    myPeerConnection.addICECandidate(ice);
})

// RTC Code

function makeConnection(){
    myPeerConnection = new RTCPeerConnection();
    myPeerConnection.addEventListener('icecandidate', handleIce);
    myPeerConnection.addEventListener('addstream', handleAddStream);
    myStream
        .getTracks()
        .forEach(track => myPeerConnection.addTrack(track, myStream));
}

function handleIce(data){
    console.log('set candidate');
    socket.emit('ice', data.candidate, roomName);
}

function handleAddStream(data){
    const peerFace = document.getElementById('peerFace');
    peerFace.srcObject = data.stream;
}