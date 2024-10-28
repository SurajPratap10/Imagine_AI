// i just made some changes so that it can add connection options to improve performance and handle potential issues and want to log more details about the error, such as the error code so that it ,may create more easiness and reusble of code.

const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

const connectDb = async () => {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error("Please set the MONGODB_URI environment variable.");
    process.exit(1);
  }

  try {
    const connect = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to Db: ${connect.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
  }
};

module.exports = connectDb;
