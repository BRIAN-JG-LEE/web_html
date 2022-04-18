var http = require("http");
var fs = require("fs");
var url = require("url");

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = new URL("http://localhost:3000" + _url).searchParams;
  var title = queryData.get("id");
  console.log(queryData.get("id"));
  if (_url == "/") {
    title = "Developer's";
  }
  if (_url == "/favicon.ico") {
    return response.writeHead(404);
  }
  response.writeHead(200);
  fs.readFile(`data/${queryData.get("id")}`, "utf-8", (err, description) => {
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
    response.end(template);
  });
});
app.listen(3000);
