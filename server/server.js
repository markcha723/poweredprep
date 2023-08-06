const express = require("express");
const PORT = 8080;
const app = express();

/* 
  ROUTES
*/
app.get("/api", (req, res) => {
  res.json({ users: ["userOne", "userTwo", "userThree"] });
});

app.get("/blog", (req, res) => {
  res.send("lol!");
});

app.listen(PORT, () => {
  console.log("Server started on port 8080");
});
