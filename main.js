var http = require("http");
var fs = require("fs");
var url = require("url");

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;
  var title = queryData.id;

  if (pathname === "/") {
    fs.readFile(`data/${queryData.id}`, "utf-8", (err, description) => {
      var template = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>web-${title}</title>
            <meta charset="utf-8" />
          </head>
          <body>
            <h1><a href="/">Developer</a></h1>
            <ul>
              <li><a href="/?id=REACT">REACT</a></li>
              <li><a href="/?id=SPRING">SPRING</a></li>
              <li><a href="/?id=Node">Node.js</a></li>
            </ul>
            <h2>${title}</h2>
            <p>
              ${description}
            </p>
          </body>
        </html>
      `;
      response.writeHead(200);
      response.end(template);
    });
  } else {
    response.writeHead(404);
    response.end("Not found page");
  }
});
app.listen(3000);
