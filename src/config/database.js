const mongoose = require("mongoose");

const connectionToDatabase = async () => {
  try {
    mongoose.connect('mongodb+srv://Rajnishsingh:Qwerty123*@cluster0.d7vjd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectionToDatabase;
