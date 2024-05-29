const path = require('path');
const express = require('express');
const configViewEngine = (app) => {
    console.log(">>> check __dirname: ", path.join('./src', 'views'));
    app.set('view engine', 'ejs');
    app.set('views', path.join('./src', 'views'));
    app.use(express.static('public'));
    app.use(express.static('uploads'));
}

module.exports = configViewEngine;