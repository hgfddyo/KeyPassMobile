let func = async () => {
  let credentials = {
    user: "1",
    password: "sd",
  };
  let response = await fetch(" http://127.0.0.1:7000/set-cookie", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json;",
    },
    body: JSON.stringify(credentials),
  });
  let headers = await response.headers;
  let result = await response.json();
  console.log(result);
  let a = document.getElementById("text");
  let header;
  for (let h of headers.keys()) {
    header += " ".concat(h);
  }
  a.innerText = "кукки получены: " + header;
};
