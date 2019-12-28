var http = require('http');
const url = require('url');
const port = process.env.FUNCTIONS_HTTPWORKER_PORT || 54321;
console.log("port" + port);
//create a server object:
http.createServer(function (req, res) {
  const reqUrl = url.parse(req.url, true);
  if (req.method === "GET") {
    res.writeHead(200, {"Content-Type": "application/json"});
    var json = JSON.stringify({ functionName : req.url.replace("/","")});
    res.end(json);
  } else {
    let body = "";
    req.on("data", chunk => {
      body += chunk;
    });
    req.on("end", () => {
      res.writeHead(200, {"Content-Type": "application/json"});
      var json = body;
      console.log(JSON.stringify(JSON.parse(body), null, 2));
      res.end(body);
    });
  }
}).listen(port);