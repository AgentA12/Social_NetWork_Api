const mongoose = require("mongoose");
const seedUsers = require("./user-seeds");
const seedThoughts = require("./thought-seeds");
const seedReactions = require("./reaction-seeds");

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/network_api", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MONGO CONNECTION OPEN");
  })
  .catch((error) => {
    console.log(error);
  });

const seedDB = async () => {
  console.log("-----SEEDING USERS-----");
  await seedUsers();
};

seedDB().then(() => {
  console.log("SEEDING COMPLETE")
  mongoose.connection.close();
});
