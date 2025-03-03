const htpp = require("http");
const fs = require("fs");
const port = process.env.PORT || 3000;

function serveStaticFile(res, path, contentType, responseCode = 200) {
  fs.readFile(__dirname + path, (err, data) => {
    if (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      return res.end("500 - Internal Error");
    }
    res.writeHead(responseCode, { "Content-Type": contentType });
    res.end(data);
  });
}

const server = htpp.createServer((req, res) => {
  const path = req.url.replace(/\/?(?:\?.*)?$/, "");
  switch (path) {
    case "":
      serveStaticFile(res, "/public/home.html", "text/html");
      break;
    case "/about":
      serveStaticFile(res, "/public/about.html", "text/html");
      break;
    case "/img/golden.jpg":
      serveStaticFile(res, "/public/img/golden.jpg", "image/jpg");
      break;
    default:
      serveStaticFile(res, "/public/404.html", "text/html");
      break;
  }
});

server.listen(port, () =>
  console.log(
    `server started on port ${port}; ` + "press Ctrl-C to terminate...."
  )
);
