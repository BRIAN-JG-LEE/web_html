var http = require("http");
var fs = require("fs");
var url = require("url");
var qs = require("querystring");

const path = require("path");

function templateHTML(title, list, body) {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <title>web-${title}</title>
      <meta charset="utf-8" />
    </head>
    <body>
      <h1><a href="/">Developer's page</a></h1>
      ${list}
      <a href="/create">create cont</a>
      ${body}
    </body>
  </html>
`;
}

function templateList(filelist) {
  var list = "<ul>";
  var i = 0;
  while (i < filelist.length) {
    list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    i = i + 1;
  }
  list = list + "</ul>";
  return list;
}

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;

  if (pathname === "/") {
    if (queryData.id === undefined) {
      fs.readdir("./data", function (error, filelist) {
        var title = "Welcome! developer!";
        var description = "Hello REACT, SPRING, Node";
        var list = templateList(filelist);
        var template = templateHTML(
          title,
          list,
          `<h2>${title}</h2>
        <p>
          ${description}
        </p>`
        );
        response.writeHead(200);
        response.end(template);
      });
    } else {
      fs.readdir("./data", function (error, filelist) {
        fs.readFile(`data/${queryData.id}`, "utf-8", (err, description) => {
          var title = queryData.id;
          var list = templateList(filelist);
          var template = templateHTML(
            title,
            list,
            `<h2>${title}</h2>
          <p>
            ${description}
          </p>`
          );
          response.writeHead(200);
          response.end(template);
        });
      });
    }
  } else if (pathname === "/create") {
    fs.readdir("./data", function (error, filelist) {
      var title = "developer's create";
      var list = templateList(filelist);
      var template = templateHTML(
        title,
        list,
        `
        <form action="http://localhost:3000/create_process" method="post">
          <p><input type="text" name="title" placeholder="타이틀을 입력하세요"/></p>
          <p><textarea name="description" placeholder="내용을 입력하세요"></textarea></p>
          <p><input type="submit" value="이걸 누르면 서버로 전송" /></p>
        </form>
        `
      );
      response.writeHead(200);
      response.end(template);
    });
  } else if (pathname === "/create_process") {
    var body = "";

    request.on("data", function (data) {
      body = body + data;
    });

    request.on("end", function () {
      var post = qs.parse(body);
      var title = post.title;
      var description = post.description;
      console.log(post);
      console.log(post.title);
      console.log(post.description);
      fs.writeFile(`data/${title}`, description, "utf8", function (err) {
        response.writeHead(302, { Location: `/?id=${title}` });
        response.end("success!");
      });
    });
  } else {
    response.writeHead(404);
    response.end("Not found page");
  }
});
app.listen(3000);
