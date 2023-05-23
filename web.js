let express = require("express");
let path = require("path");
let cors = require("cors");
const request = require("request");

const app = express();
const port = 8001;

const client_id = 'RpEpNzAEoLYt5fQM5M7K';
const client_secret = 'hiJr7RlTPg';

app.use(cors());
app.use(express.static(path.join(__dirname, '/build')));

app.get("/", (req, res) => {
    console.log("Welcome!");
    res.sendFile(path.join(__dirname, "/build/index.html"));
})

app.get("/saveWordMap", (req, res) => {
    res.sendFile(path.join(__dirname, "/build/index.html"));
})

app.get("/practice", (req, res) => {
    res.sendFile(path.join(__dirname, "/build/index.html"));
})

app.get("/dictionary_Word", (req, res) => {
    res.sendFile(path.join(__dirname, "/build/index.html"));
})

app.get("/suhyeon", (req, res) => {
    res.sendFile(path.join(__dirname, "/build/index.html"));
})

app.get("/translate", (req, res) => {
    let api_url = 'https://openapi.naver.com/v1/papago/n2mt';
    let options = {
        url: api_url,
        form: {'source':'ja', 'target':'ko', 'text': req.query.text},
        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };
    request.post(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
            res.end(body); 
        } else {
            res.status(response.statusCode).end();
            // console.log('error = ' + response.statusCode);
        }
    })
})

app.get("/findWord", (req, res) => {
    let text = req.query.q;
    let url = encodeURI(`https://dic.daum.net/search.do?q=${text}`);
    request(url, (err, response, html) => {
        res.send(html);
    })
})

app.listen(port, () => {
    console.log("Server start");
})
