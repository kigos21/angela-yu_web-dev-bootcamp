const img1 = document.querySelector(".img1");
const img2 = document.querySelector(".img2");

let randomNumber1 = generateDiceNumber();
let randomNumber2 = generateDiceNumber();

img1.setAttribute("src", "./images/dice" + randomNumber1 + ".png");
img2.setAttribute("src", "./images/dice" + randomNumber2 + ".png");

const h1 = document.querySelector("h1");

let result = "";
if (randomNumber1 === randomNumber2) {
  result = "🚩 Draw! 🚩";
} else if (randomNumber1 > randomNumber2) {
  result = "🚩 Player 1 Wins!";
} else {
  result = "Player 2 Wins! 🚩";
}
h1.textContent = result;

function generateDiceNumber() {
  return Math.floor(Math.random() * 6) + 1;
}
