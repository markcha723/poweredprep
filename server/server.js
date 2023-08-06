const express = require("express");
const PORT = 8080;
const app = express();

app.get("/api", (req, res) => {
  res.json({ users: ["userOne", "userTwo", "userThree"] });
});

app.listen(PORT, () => {
  console.log("Server started on port 8080");
});
