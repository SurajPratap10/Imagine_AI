const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const JWT = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Name is required!!!'],
	},
	email: {
		type: String,
		required: [true, 'Email is required!!!'],
		unique: true,
	},
	password: {
		type: String,
		required: [true, 'password is required!!!'],
		minlength: [6, 'Password length should be 6 character long'],
	},
});

userSchema.pre('save', async function (next) {
	// update password
	if (!this.isModified('password')) {
		next();
	}
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

userSchema.methods.matchPassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

userSchema.methods.getSignedToken = function (res) {
	const accessToken = JWT.sign(
		{ id: this._id },
		process.env.JWT_ACCESS_SECRET,
		{ expiresIn: '1d' }
	);
	const refreshToken = JWT.sign(
		{ id: this._id },
		process.env.JWT_REFRESH_TOKEN,
		{ expiresIn: '15d' }
	);
	res.cookie('refreshToken', `${refreshToken}`, {
		maxAge: 86400 * 7000,
		httpOnly: true,
	});
	return accessToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
