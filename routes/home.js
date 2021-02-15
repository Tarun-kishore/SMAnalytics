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
    // console.log(req.body)
    // const options = {
    //     "method": "GET",
    //     "hostname": "alpha-vantage.p.rapidapi.com",
    //     "port": null,
    //     "path": `/query?function=SYMBOL_SEARCH&keywords=${req.body.keywords}&apikey=${key}`,
    //     "headers": {
    //         "x-rapidapi-key": key,
    //         "x-rapidapi-host": "alpha-vantage.p.rapidapi.com",
    //         "useQueryString": true
    //     }
    // };
    
    // const reqq = http.request(options, function (res) {
    //     const chunks = [];
    
    //     res.on("data", function (chunk) {
    //         chunks.push(chunk);
    //     });
    
    //     res.on("end", function () {
    //         const body = Buffer.concat(chunks);
    //         console.log(body)
    //         res.json(body.toString());
    //     });
    // });
    
    // reqq.end();
    // ress.send(reqq)
    console.log(reqq.body)
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
// 	if (res.error) throw new Error(res.error);
//     // ress.render('home.pug',{
//     //     data : res.body
//     // }
//     // )
	// console.log(res.body['Time Series (30min)']);
    ress.json(res.body)
});
})



router.post('/option', async (reqq,ress) =>{
    // console.log(req.body)
    // const options = {
    //     "method": "GET",
    //     "hostname": "alpha-vantage.p.rapidapi.com",
    //     "port": null,
    //     "path": `/query?function=SYMBOL_SEARCH&keywords=${req.body.keywords}&apikey=${key}`,
    //     "headers": {
    //         "x-rapidapi-key": key,
    //         "x-rapidapi-host": "alpha-vantage.p.rapidapi.com",
    //         "useQueryString": true
    //     }
    // };
    
    // const reqq = http.request(options, function (res) {
    //     const chunks = [];
    
    //     res.on("data", function (chunk) {
    //         chunks.push(chunk);
    //     });
    
    //     res.on("end", function () {
    //         const body = Buffer.concat(chunks);
    //         console.log(body)
    //         res.json(body.toString());
    //     });
    // });
    
    // reqq.end();
    // ress.send(reqq)
    console.log(reqq.body)
    var req = unirest("GET", "https://alpha-vantage.p.rapidapi.com/query");

req.query({
	"function": "SYMBOL_SEARCH",
	"keywords": `${reqq.body.keywords}`,
	"datatype": "json"
	// "output_size": "compact"
});

req.headers({
	"x-rapidapi-key": key,
	"x-rapidapi-host": "alpha-vantage.p.rapidapi.com",
	"useQueryString": true
});


req.end(function (res) {
// 	if (res.error) throw new Error(res.error);
//     // ress.render('home.pug',{
//     //     data : res.body
//     // }
//     // )
	// console.log(res.body['Time Series (30min)']);
    ress.json(res.body)
});
})

module.exports = router