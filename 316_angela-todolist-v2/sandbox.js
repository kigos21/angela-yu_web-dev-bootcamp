const mongoose = require("mongoose");

const main = async () => {
  await mongoose.connect("mongodb://localhost:27017/taskly");
  const itemSchema = new mongoose.Schema({
    name: String,
  });
  const Item = mongoose.model("Item", itemSchema);

  // const itemNames = ["Todo App", "Valorant", "Series"];
  // const items = [];
  //
  // for (let i = 0; i < 3; i++) {
  // const newItem = new Item({
  // _id: new mongoose.Types.ObjectId(),
  // name: itemNames[i],
  // });
  //
  // items.push(newItem);
  // }
  //
  // await Item.insertMany(items);

  try {
    const items = await Item.find();
    items.forEach((item) => console.log(item));
  } catch (error) {
    console.log("Operation failed.");
    console.log(error);
  }

  mongoose.connection.close();
};

main();
