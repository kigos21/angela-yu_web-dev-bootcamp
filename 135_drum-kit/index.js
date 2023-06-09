const buttons = document.querySelectorAll("button");

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    let audioName = this.getAttribute("value");
    let audio = new Audio("./sounds/" + audioName + ".mp3");
    audio.play();
  });
}

document.addEventListener("keydown", function (event) {
  // since the event key is equal to a class in the DOM,
  // we can use that as an input for the selector, and
  // simulate click to call the the function event on click.
  try {
    let button = document.querySelector("." + event.key.toLowerCase());
    button.click();
    buttonClicked(button);
  } catch (error) {
    console.error();
  }
});

function buttonClicked(button) {
  button.classList.add("pressed");
  setTimeout(function () {
    button.classList.remove("pressed");
  }, 100);
}

// let audio = new Audio("./sounds/tom-1.mp3");
// audio.play();
