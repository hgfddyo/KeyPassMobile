var http = require("https");

var options = {
  host: "www.avito.ru",
  path: "/auth/login",
  body: new FormData(),
};

callback = function (response) {
  var answer;
  response.on("data", function (chunk) {
    answer = chunk;
  });

  response.on("end", function () {
    console.log(answer);
  });
};

http.request(options, callback).end();
