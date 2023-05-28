const express = require('express');
const { isLoggedin } = require('../middlewares/isLoggedIn');
const router = express.Router();

router.get('/', (_req, res, _next) => {
	res.render('home', { path: '/' }); // passed path to track active <a> class in header.ejs
});

router.get('/generateImg', isLoggedin, (_req, res, _next) => {
	res.render('imagineAi', { path: '/generateImg' });
});

router.get('/contactUs', (_req, res, _next) => {
	res.render('contactUs', { path: '/contactUs' });
});

router.get('/login', (req, res, next) => {
	res.render('login', { path: '/login' });
});

router.get('/signup', (_req, res, _next) => {
	res.render('signup', { path: '/signup' });
});

router.get('/privacypolicy', (req, res, next) => {
	res.render('privacypolicy', { path: 'privacypolicy' });
});
module.exports = router;
