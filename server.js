const express = require("express"),
  bodyParser = require("body-parser");
const server = express();
fs = require("fs");

server.listen(3000, () => {
  console.log("server running.....");
});

server.use(express.static("website"));

//GET AUTORES
server.get("/homebanking/:username", (req, res) => {
  var username = req.params.username;
  let rawdata = fs.readFileSync("data.json");
  let users = JSON.parse(rawdata);

  user = users.filter((element) => element.user == username);

  return res.json(user).status(200);
});

//TRANSFERIR DINERO
server.use(bodyParser.json());
server.post("/homebanking/transfer", (req, res) => {
  var collector = req.body.collector;
  var payer = req.body.payer;
  var amount = req.body.amount;

  let rawdata = fs.readFileSync("data.json");
  let users = JSON.parse(rawdata);

  //PAYER USE VALIDATION
  _payer = users.filter((element) => element.user == payer);
  _payerIndex = users.findIndex((element) => element.user == payer);

  if (_payer.length <= 0) {
    return res.status(404).send({ message: "Payer not found" });
  }
  //COLLECTOR USER VALIDATION
  _collector = users.filter((element) => element.user == collector);
  _collectorIndex = users.findIndex((element) => element.user == collector);
  if (_collector.length <= 0 && collector != "admin") {
    return res.status(404).send({ message: "Collector not found" });
  }
  //MONEY VALIDATION
  if (collector != "admin" && _payer[0].money < amount) {
    return res
      .status(400)
      .send({ message: "Insuficient money in payer account" });
  }
  //ACCOUNT VALIDATION

  if (collector == payer) {
    return res.status(400).send({ message: "Cannot pay yourself" });
  }

  //MONEY TRANSFER
  _collector[0].money += amount;
  _payer[0].money -= amount;
  users[_payerIndex] = _payer[0];
  users[_collectorIndex] = _collector[0];
  data = JSON.stringify(users);
  fs.writeFileSync("data.json", data);

  return res.json({ status: "approved" }).status(200);
});

//TEST
server.use(bodyParser.json());
server.post("/homebanking/tran", (req, res) => {
  return res.json(req.body).status(200);
});
