if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const app = express();
var path = require('path');
const bodyParser = require('body-parser')


const homeRouter = require('./routes/home')

app.use(express.json())
app.set('view engine','pug')
app.set('views', __dirname + '/views')
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({limit : '10mb', extended: false }))


app.use('/',homeRouter)

app.listen(process.env.PORT || 3000)