// mailchimp.setConfig({
//   apiKey: "564317d51e3a6915f2be3617a646da6f-us21",
//   server: "us21",
// });

const client = require("@mailchimp/mailchimp_marketing");

client.setConfig({
  apiKey: "564317d51e3a6915f2be3617a646da6f-us21",
  server: "us21",
});

const run = async () => {
  const response = await client.lists.getAllLists();
  console.log(response);
};

run();
