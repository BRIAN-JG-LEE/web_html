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
  var template = `
  <!DOCTYPE html>
  <html>
    <head>
      <title>web-${title}</title>
      <meta charset="utf-8" />
    </head>
    <body>
      <h1><a href="/">Developer</a></h1>
      <ol>
        <li><a href="/?id=REACT">REACT</a></li>
        <li><a href="/?id=SPRING">SPRING</a></li>
        <li><a href="/?id=Node.js">Node.js</a></li>
      </ol>
  
      <h2>${title}</h2>
  
      <strong><a href="https://nodejs.org/ko/">Node.js는</a></strong>
      확장성 있는 네트워크 애플리케이션(특히 서버 사이드) 개발에 사용되는
      소프트웨어 플랫폼이다. 작성 언어로 자바스크립트를 활용하며
      논블로킹(Non-blocking) I/O와 단일 스레드 이벤트 루프를 통한 높은 처리 성능을
      가지고 있다. 내장 HTTP 서버 라이브러리를 포함하고 있어 웹 서버에서 아파치
      등의 별도의 소프트웨어 없이 동작하는 것이 가능하며 이를 통해 웹 서버의
      동작에 있어 더 많은 통제를 가능케 한다.
      <img src="coding.jpg" width="95%" />
      <h3 style="margin-top: 55px">Features</h3>
  
      <p>
        V8으로 빌드된 이벤트 기반 자바스크립트 런타임이다. 웹 서버와 같이 확장성
        있는 네트워크 프로그램 제작을 위해 고안되었다.
      </p>
      <p>
        파이썬으로 만든 트위스티드, 펄로 만든 펄 객체 환경, 루비로 만든 이벤트
        머신과 그 용도가 비슷하다. 대부분의 자바스크립트가 웹 브라우저에서
        실행되는 것과는 달리, 서버 측에서 실행된다. 일부 CommonJS 명세[4]를
        구현하고 있으며, 쌍방향 테스트를 위해 REPL 환경을 포함하고 있다.
      </p>
    </body>
  </html>
  `;
  response.end(template);
});
app.listen(3000);
