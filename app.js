const express = require('express');
const path = require('path');
require('./db/mongoose')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/user')
const pagesRouter = require('./routes/pages')
const app = express();


const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.json())
app.use(userRouter)
app.use(pagesRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, function(){
    console.log('Server has started');
});
