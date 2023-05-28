const JWT = require('jsonwebtoken');

exports.isLoggedin = async (req, res, next) => {
	if (req.cookies?.accessToken) {
		//access-token is available
		try {
			const verified = await JWT.verify(
				req.cookies.accessToken,
				process.env.JWT_ACCESS_SECRET
			);
			return next();
		} catch (error) {
			console.log('Access token invalid/expired');
		}
	}

	console.log(
		'Hello refresh-token checking as access token might be invalid/unavailable in cookies'
	);
	if (req.cookies?.refreshToken) {
		//refresh-token is available
		try {
			const verified = await JWT.verify(
				req.cookies.refreshToken,
				process.env.JWT_REFRESH_TOKEN
			);
		} catch (error) {
			console.log('refresh Token expired/invalid');
			return res.redirect('/login');
		}
	} else {
		console.log('Refresh token Not available in cookies!!!');
		return res.redirect('/login');
	}
	next();
};
