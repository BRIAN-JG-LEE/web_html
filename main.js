var http = require("http");
var fs = require("fs");
var url = require("url");
var qs = require("querystring");
var template = require("./lib/template.js");
var path = require("path");
var sanitizeHtml = require("sanitize-html");

var app = http.createServer(function (request, response) {
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  var pathname = url.parse(_url, true).pathname;

  if (pathname === "/") {
    if (queryData.id === undefined) {
      fs.readdir("./data", function (error, filelist) {
        var title = "Welcome! developer!";
        var description = "Hello REACT, SPRING, Node.js";
        var list = template.list(filelist);
        var html = template.HTML(
          title,
          list,
          `<h2>${title}</h2>
        <p>
          ${description}
        </p>`,
          `<a href="/create">create cont</a>`
        );
        response.writeHead(200);
        response.end(html);
      });
    } else {
      fs.readdir("./data", function (error, filelist) {
        var filteredId = path.parse(queryData.id).base;
        fs.readFile(`data/${filteredId}`, "utf-8", (err, description) => {
          var title = queryData.id;
          var sanitizedTitle = sanitizeHtml(title);
          var sanitizedDescription = sanitizeHtml(description);
          var list = template.list(filelist);
          var html = template.HTML(
            sanitizedTitle,
            list,
            `<h2>${sanitizedTitle}</h2>
          <p>
            ${sanitizedDescription}
          </p>`,
            `<a href="/create">create cont</a> 
             <a href="/update?id=${sanitizedTitle}">update cont</a>
             <form action="/delete_process" method="post">
              <input type="hidden" name="id" value="${sanitizedTitle}" />
              <input type="submit" value="delete" />
             </form>
             `
          );
          response.writeHead(200);
          response.end(html);
        });
      });
    }
  } else if (pathname === "/create") {
    fs.readdir("./data", function (error, filelist) {
      var title = "developer's create";
      var list = template.list(filelist);
      var html = template.HTML(
        title,
        list,
        `
        <form action="http://localhost:3000/create_process" method="post">
          <p><input type="text" name="title" placeholder="???????????? ???????????????"/></p>
          <p><textarea name="description" placeholder="????????? ???????????????" cols="23" rows="10"></textarea></p>
          <p><input type="submit" value="?????? ????????? ????????? ??????" /></p>
        </form>
        `,
        ""
      );
      response.writeHead(200);
      response.end(html);
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
      fs.writeFile(`data/${title}`, description, "utf8", function (err) {
        response.writeHead(302, { Location: `/?id=${title}` });
        response.end("success!");
      });
    });
  } else if (pathname === "/update") {
    fs.readdir("./data", function (error, filelist) {
      var filteredId = path.parse(queryData.id).base;
      fs.readFile(`data/${filteredId}`, "utf-8", (err, description) => {
        var title = queryData.id;
        var list = template.list(filelist);
        var html = template.HTML(
          title,
          list,
          `
          <form action="http://localhost:3000/update_process" method="post">
            <input type="hidden" name="id" value="${title}"/>
            <p><input type="text" name="title" placeholder="???????????? ???????????????" value="${title}"/></p>
            <p><textarea name="description" placeholder="????????? ???????????????" cols="23" rows="10">${description}</textarea></p>
            <p><input type="submit" value="?????? ????????? ????????????" /></p>
          </form>
          `,
          `<a href="/create">create cont</a> <a href="/update?id=${title}">update cont</a>`
        );
        response.writeHead(200);
        response.end(html);
      });
    });
  } else if (pathname === "/update_process") {
    var body = "";

    request.on("data", function (data) {
      body = body + data;
    });

    request.on("end", function () {
      var post = qs.parse(body);
      var id = post.id;
      var title = post.title;
      var description = post.description;
      fs.rename(`data/${id}`, `data/${title}`, function (err) {
        fs.writeFile(`data/${title}`, description, "utf8", function (err) {
          response.writeHead(302, { Location: `/?id=${title}` });
          response.end("success!");
        });
      });
    });
  } else if (pathname === "/delete_process") {
    var body = "";

    request.on("data", function (data) {
      body = body + data;
    });

    request.on("end", function () {
      var post = qs.parse(body);
      var id = post.id;
      var filteredId = path.parse(id).base;
      fs.unlink(`data/${filteredId}`, function (err) {
        response.writeHead(302, { Location: `/` });
        response.end("success!");
      });
    });
  } else {
    response.writeHead(404);
    response.end("Not found page");
  }
});
app.listen(3000);
