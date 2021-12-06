const express = require("express"),
  app = express(),
  cookieParser = require("cookie-parser");
var cors = require("cors");
var port = "7000";
var host = "192.168.1.101";
app.use(cors({ origin: true, credentials: true }));

app.use(cookieParser("secret key"));

app.post("/get-cookie", (req, res) => {
  console.log("Cookie: ", req.cookies);
  res.send("Get Cookie");
});

app.post("/set-cookie", (req, res) => {
  var body = "";
  req.on("data", function (data) {
    body += data;
  });
  req.on("end", function () {
    console.log(JSON.parse(body));
    let obj = JSON.parse(body);
    res.cookie("user", obj.user, { maxAge: 900000, httpOnly: true });
    res.cookie("password", obj.password, {
      maxAge: 900000,
      httpOnly: true,
      secure: true,
    });
    res.json({ message: "goodbye" });
  });
});

app.listen(port, host, () =>
  console.log(`Server listens http://${host}:${port}`)
);
