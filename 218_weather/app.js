const express = require("express");
const https = require("https");

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port} .`);
});

app.get("/", (req, res) => {
  const url = "https://pokeapi.co/api/v2/pokemon/123";
  https.get(url, (response) => {
    let data = "";

    response.on("data", (chunk) => {
      data += chunk;
    });

    response.on("end", () => {
      const pokemonData = JSON.parse(data);
      console.log(`Pokemon Name: ${pokemonData.name}`);

      // try {
      //   const pokemonData = JSON.parse(data);
      //   console.log(pokemonData.);
      // } catch (error) {
      //   console.error("Error parsing JSON:", error);
      // }
    });
  });

  res.send("Check console!");
});
