// // getting-started.js
// const mongoose = require("mongoose");
// const db = "taskly";

// main().catch((err) => console.log(err));

// async function main() {
//   await mongoose.connect("mongodb://127.0.0.1:27017/" + db);

//   const userSchema = new mongoose.Schema({
//     name: String,
//     password: String,
//     tasks: [],
//   });

//   const User = new mongoose.model("user", userSchema);

//   console.log(await User.findOne({ name: "jad" }).exec());

//   mongoose.connection.close();
// }

const { v4: uuidv4 } = require("uuid");

function generateUUID() {
  const uuid = uuidv4();
  return uuid;
}

// Example usage:
const myUUID = generateUUID();
console.log(myUUID);
