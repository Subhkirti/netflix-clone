const mongoose = require('mongoose');

const connection = async () => {
  try {
    await mongoose.connect("mongodb+srv://kirti:navgurukul@netflix-clone.bznnjy5.mongodb.net/", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected..");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};

module.exports = connection;
