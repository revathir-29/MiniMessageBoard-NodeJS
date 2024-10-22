const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index');
const exp = require('constants');

const app = express();

//set the view engine to EJS
app.set('view engine' , 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Middleware to parse form data
app.use(express.urlencoded({extended: true}));

//static files
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/' , indexRouter);

//start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


