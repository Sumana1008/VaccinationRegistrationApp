const mongoose = require("mongoose");

const mongoConnect = () => {
  mongoose
    .connect('mongodb+srv://SumanaMupparapu:helloworld@cluster0.msbktnz.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Failed to connect to MongoDB", error);
    });
};
module.exports = {
  mongoConnect: mongoConnect,
};