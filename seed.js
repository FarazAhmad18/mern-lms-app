const mongoose = require("mongoose");
require("dotenv").config();

async function seedDB() {
  try {
    await mongoose.connect(process.env.DB_URL, {
      dbName: "Lms_DB",
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("DB connected successfully");

    // Define schema + model
    const testSchema = new mongoose.Schema({
      name: String
    });
    const TestModel = mongoose.model("Test", testSchema);

    // Insert a document
    const doc = await TestModel.create({ name: "Seed document" });
    console.log("Document inserted:", doc);

    await mongoose.connection.close();
    console.log("Connection closed");
  } catch (err) {
    console.error("Error during seeding:", err);
    process.exit(1);
  }
}

seedDB();
