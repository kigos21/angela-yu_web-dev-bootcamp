const loginBtn = document.querySelector(".login-btn");
const signupBtn = document.querySelector(".signup-btn");

loginBtn.addEventListener("click", () => {
  window.location.href = "/login";
});

signupBtn.addEventListener("click", () => {
  window.location.href = "/signup";
});
