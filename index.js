const path = require('path');
const express = require('express');
require('dotenv').config();
const port = process.env.PORT || 5000;
const viewRoutes = require('./routes/viewRoutes');


const app = express();

//EJS AS RENDER ENGINE
app.set('view engine', 'ejs');
app.set('views','views'); //look for views in views folder

//ENABLING BODY PARSER:
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
console.log(err);
res.status(500).json({ error: 'Internal Server Error' })});



//STATIC FOLDER:
app.use(express.static(path.join(__dirname, 'public')));

//View Routes taken from viewRoutes.js
app.use(viewRoutes);

app.use('/openai', require('./routes/openaiRoutes'));
app.listen(process.env.PORT, () => console.log(`Server started on port ${port}`));
