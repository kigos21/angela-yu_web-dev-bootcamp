function main() {
  if (!gaming) {
    return;
  }

  level++;
  header.textContent = `Level ${level}`;

  startNewLevel();
}

const buttons = document.querySelectorAll(".btn");
const soundSrc = [
  "./sounds/green.mp3",
  "./sounds/red.mp3",
  "./sounds/yellow.mp3",
  "./sounds/blue.mp3",
  "./sounds/wrong.mp3",
];

const header = document.querySelector("h1");
var gaming = false;
var level = 0;
var sequence = [];
var playerSequence = [];

document.addEventListener("keydown", function () {
  if (!gaming) {
    gaming = true;
    main();
  }
});

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    playerSequence.push(Number(this.getAttribute("value")));
    makeSound(this);

    let correct = checkSequence(sequence, playerSequence);
    if (!correct) {
      gameOver();
    }

    if (sequence.length === playerSequence.length) {
      playerSequence = [];
      setTimeout(main, 1000);
    }
  });
}

function startNewLevel() {
  let n = Math.floor(Math.random() * 4);
  sequence.push(n);
  showCue(buttons[n]);
}

function showCue(button) {
  button.classList.add("cue");
  makeSound(button);
  setTimeout(function () {
    button.classList.remove("cue");
  }, 300);
}

function makeSound(button) {
  const i = Number(button.getAttribute("value"));
  new Audio(soundSrc[i]).play();
}

function checkSequence(sequence, playerSequence) {
  for (let i = 0; i < playerSequence.length; i++) {
    if (sequence[i] != playerSequence[i]) {
      return false;
    }
  }
  return true;
}

function gameOver() {
  header.textContent = "Game over! Press a key to play again!";
  document.querySelector("body").style.backgroundColor = "#ff0000";
  new Audio(soundSrc[4]).play();
  setTimeout(function () {
    document.querySelector("body").style.backgroundColor = "#011f3f";
  }, 200);

  gaming = false;
  level = 0;
  playerSequence = [];
  sequence = [];
}
