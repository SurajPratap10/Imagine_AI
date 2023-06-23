const path = require('path');
const express = require('express');
require('dotenv').config();
const port = process.env.PORT || 5000;
const viewRoutes = require('./routes/viewRoutes');
const cookieParser = require('cookie-parser');
const connectDb = require('./config/db.js');
const app = express();

//ENABLING BODY PARSER:
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ERROR HANDLING MIDDLEWARE
app.use((err, _req, res, _next) => {
	console.log(err);
	res.status(500).json({ error: 'Internal Server Error' });
});

//STATIC FOLDER:
app.use(express.static(path.join(__dirname, 'public')));

app.use('/openai', require('./routes/openaiRoutes'));
app.use('/auth', require('./routes/auth.js'));

app.use(viewRoutes);

app.listen(process.env.PORT, () =>
	console.log(`Server started on port ${port}`)
);
// Connecting to DB

connectDb();

app.use((_req, res, _next) => {
	res.status(404).sendFile(path.join(__dirname, 'public/error.html'));
});
