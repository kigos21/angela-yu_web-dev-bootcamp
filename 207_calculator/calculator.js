const express = require("express");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.listen(port, function () {
  console.log(`Server started on http://localhost:${port}`);
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/result", function (req, res) {
  const num1 = Number(req.body.num1);
  const num2 = Number(req.body.num2);
  const operator = req.body.operator;

  let result;
  switch (operator) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "*":
      result = num1 * num2;
      break;
    case "/":
      result = num1 / num2;
      break;
    default:
      result = "Invalid operator";
  }

  res.send(`The result is ${result}`);
});

app.get("/bmicalculator", function (req, res) {
  res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/bmicalculator", function (req, res) {
  const weight = parseFloat(req.body.weight);
  const height = parseFloat(req.body.height);

  const bmi = weight / (height * height);
  res.send(`<h1>BMI Calculator</h1>
  Your BMI is ${bmi}`);
});
