const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  name: String
});

const TestModel = mongoose.model("Test", testSchema);

async function createTestDoc() {
  await TestModel.create({ name: "Hello MongoDB" });
  console.log("Test document created");
}

createTestDoc();
