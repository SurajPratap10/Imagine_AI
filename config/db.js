const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const connectDb = async () => {
	const uri = process.env.MONGODB_URI;
	try {
		const connect = await mongoose.connect(uri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log(`Connected to Db: ${connect.connection.host}`);
	} catch (error) {
		console.log(`MongoDb connection Error:${error}`);
	}
};

module.exports = connectDb;
