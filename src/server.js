require('dotenv').config()
const express = require('express');
const path = require('path');
const configViewEngine = require('./config/viewEngine');
const WebRouter = require('./routes/web');
const connection = require('./config/database');

const app = express();
const port = process.env.PORT;
const hostname = process.env.HOST_NAME;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//config static folder
configViewEngine(app);

app.use(WebRouter);
app.use((req, res) => {
    res.render('404.ejs');
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});