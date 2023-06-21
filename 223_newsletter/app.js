const express = require("express");
const app = express();
const port = 3000;

const mailchimp = require("@mailchimp/mailchimp_marketing");
mailchimp.setConfig({
  apiKey: "564317d51e3a6915f2be3617a646da6f-us21",
  server: "us21",
});

app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`

  ------------------------------------------
  Server started on http://localhost:${port}
  ------------------------------------------
  
  `);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
  const subFname = req.body.firstName;
  const subLname = req.body.lastName;
  const subEmail = req.body.email;

  const listId = "7e883099f8";
  const subscribingUser = {
    firstName: subFname,
    lastName: subLname,
    email: subEmail,
  };

  async function run() {
    try {
      const response = await mailchimp.lists.addListMember(listId, {
        email_address: subscribingUser.email,
        status: "subscribed",
        merge_fields: {
          FNAME: subscribingUser.firstName,
          LNAME: subscribingUser.lastName,
        },
      });

      res.sendFile(__dirname + "/success.html");
    } catch (error) {
      console.log(error.response.statusCode);
      console.log(error.response.body);

      res.sendFile(__dirname + "/failure.html");
    }
  }

  run();
});
