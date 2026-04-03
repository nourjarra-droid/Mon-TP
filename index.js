const express = require("express");
const {
  GenerateJWT,
  DecodeJWT,
  ValidateJWT
} = require("./dec-enc.js");
const app = express();
app.use(express.json());
const port = 3100;
app.get("/", (req, res) => {
  res.send("JWT API is running");
});
app.post("/api/GenerateJWT", (req, res) => {
  const token = GenerateJWT(
    req.body.header,
    req.body.claims,
    req.body.key
  );
  res.json({
    token: token
  });
});


app.post("/api/DecodeJWT", (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ error: "Token is required" });
  }

  try {
    const decoded = DecodeJWT(token);
    res.json(decoded);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.post("/api/ValidateJWT", (req, res) => {
  const valid = ValidateJWT(
    req.body.header,
    req.body.token,
    req.body.key
  );
  res.json({
    valid: valid
  });
});


app.listen(port, () => {

  console.log("Server running on port " + port);

});