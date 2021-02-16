var unirest = require("unirest");

const http = require('https')
const express = require('express')
const router = express.Router()
const key = process.env.API_KEY

router.use(express.json())

router.get('/', (req,res) =>{
    res.render('home.pug')
})

router.post('/search', async (reqq,ress) =>{
    var req = unirest("GET", "https://alpha-vantage.p.rapidapi.com/query");

req.query({
	"interval": "30min",
	"function": "TIME_SERIES_INTRADAY",
	"symbol": `${reqq.body.code}`,
	"datatype": "json",
	"output_size": "compact"
});

req.headers({
	"x-rapidapi-key": key,
	"x-rapidapi-host": "alpha-vantage.p.rapidapi.com",
	"useQueryString": true
});


req.end(function (res) {

    ress.json(res.body)
});
})



module.exports = router