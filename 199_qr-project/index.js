/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer
  .prompt([
    {
      type: "input",
      name: "url",
      message: "Enter the URL for the QR image: ",
      validate: function (input) {
        const isValidUrl = input.match(/^https?:\/\/[^\s/$.?#].[^\s]*$/i);
        if (isValidUrl) {
          return true;
        } else {
          return "Please enter a valid URL.";
        }
      },
    },
  ])
  .then((input) => {
    console.log(input.url);
    const urlQr = qr.image(input.url, { type: "png" });
    urlQr.pipe(fs.createWriteStream("urlQr.png"));
    console.log("QR image saved!");

    fs.writeFile("urlText.txt", input.url, function (error) {
      if (error) {
        console.error(error);
        throw error;
      }
    });

    console.log("URL text written!");
    console.log("Exiting program...");
    setTimeout(2000);
  })
  .catch((error) => {
    console.error(error);
  });
