const express = require('express');

const router = express.Router();

router.get('/',(req,res,next)=>{
    res.render('home',{path: '/'}); // passed path to track active <a> class in header.ejs
});

router.get('/imagineAI',(req,res,next)=>{
    res.render('imagineAI',{path: '/imagineAI'});
});

module.exports = router;