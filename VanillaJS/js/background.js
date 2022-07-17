const img = ["0.jpg", "1.jpg", "2.jpg"];

const chosenImg = img[Math.floor(Math.random() * img.length)];

const bgImg = document.createElement("img");

bgImg.src = `img/${chosenImg}`;

document.body.appendChild(bgImg);