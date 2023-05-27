const emailValidator = require('email-validator');
const passwordValidator = require('password-validator');
const userModel = require('../models/users');

exports.sendToken = async (user, res) => {
	const token = user.getSignedToken(res);
	res.status(201).json({ user, token });
};
exports.signupController = async (req, res) => {
	try {
		const { name, email, password } = req.body;

		if (name.length < 5) {
			res
				.status(400)
				.json({ error: 'invalid name!!!! Name should be atleast 5 char long' });
			return;
		}

		if (!emailValidator.validate(email)) {
			res.status(400).json({ error: 'invalid email!!!!' });
			return;
		}
		// validate password as--> Min 8 char, one upper case,one lowercase,one digit

		const passwordSchema = new passwordValidator();
		passwordSchema
			.is()
			.min(8) // Minimum length 8
			.is()
			.max(100) // Maximum length 100
			.has()
			.uppercase() // Must have uppercase letters
			.has()
			.lowercase() // Must have lowercase letters
			.has()
			.digits(1); // Must have at least 1 digits

		if (!passwordSchema.validate(password)) {
			res.status(400).json({
				error:
					'Password Should be of atleast 8 char long and should contain 1 upper case, 1 lower case and 1 digit',
			});
			return;
		}

		const emailExists = await userModel.find({ email });

		if (emailExists.length > 0) {
			console.log(emailExists);
			//email already exists
			res.status(409).json({ error: 'Email already exists' });
		} else {
			const user = await userModel.create({ name, email, password });
			this.sendToken(user, res);
		}
	} catch (error) {
		console.log('Error: ' + error);
		res.status(404).json({ error: 'Something Went Wrong!!! Try Again' });
	}
};

exports.loginController = async (req, res) => {
	const { email, password } = req.body;
	if (!emailValidator.validate(email)) {
		res.status(400).json({ error: 'invalid email!!!!' });
		return;
	}
	const user_list = await userModel.find({ email });

	if (user_list.length === 0) {
		res.status(400).json({ error: 'No such Email Exists!!!!' });
		return;
	} else {
		//email is in our DB..let's check for matching password
		const user = user_list[0];
		const matched = await user.matchPassword(password);

		if (!matched) {
			//invalid-password
			res.status(400).json({ error: 'Invalid Password' });
			return;
		} else {
			//if matched..get the tokens
			this.sendToken(user, res);
		}
	}
};
