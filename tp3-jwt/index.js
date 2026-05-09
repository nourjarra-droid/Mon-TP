const express = require("express");
const { GenerateJWT, DecodeJWT, ValidateJWT } = require("./dec-enc.js");

const app = express();
app.use(express.json());

const pool = require("./db");

const port = process.env.PORT || 3100;

// 🔌 TEST DB
pool.query("SELECT NOW()", (err, result) => {
  if (err) console.log(err);
  else console.log("DB connected ✅");
});

// 🏠 HOME
app.get("/", (req, res) => {
  res.send("Welcome to API 🚀");
});


// ================= JWT PART =================

// Generate JWT
app.post("/api/GenerateJWT", (req, res) => {
  res.json(GenerateJWT(req.body.header, req.body.claims, req.body.key));
});

// Decode JWT
app.post("/api/DecodeJWT", (req, res) => {
  res.json(DecodeJWT(req.body.sJWS));
});

// Validate JWT
app.post("/api/CheckJWT", (req, res) => {
  res.json(ValidateJWT(req.body.header, req.body.token, req.body.key));
});


// ================= DATABASE PART =================

// ➕ ADD USER
app.post("/api/addUser", (req, res) => {
  const { username, password } = req.body;

  pool.query(
    "INSERT INTO users (username, password) VALUES ($1, $2)",
    [username, password],
    (err) => {
      if (err) {
        console.log(err);
        res.send("Error ❌");
      } else {
        res.send("User added ✅");
      }
    }
  );
});

// 📖 GET USERS
app.get("/api/users", (req, res) => {
  pool.query("SELECT * FROM users", (err, result) => {
    if (err) console.log(err);
    else res.json(result.rows);
  });
});

// 🔐 LOGIN (بدل ahmed hardcoded)
app.post("/api/login", (req, res) => {
  const user_name = req.query.name;

  pool.query(
    "SELECT * FROM users WHERE username=$1",
    [user_name],
    (err, result) => {
      if (err) {
        console.log(err);
        res.json({ response: false });
      } else {
        if (result.rows.length > 0)
          res.json({ response: true });
        else
          res.json({ response: false });
      }
    }
  );
});

// 🔁 UPDATE
app.put("/api/updateUser", (req, res) => {
  const { id, username } = req.body;

  pool.query(
    "UPDATE users SET username=$1 WHERE id=$2",
    [username, id],
    (err) => {
      if (err) console.log(err);
      else res.send("Updated ✅");
    }
  );
});

// ❌ DELETE
app.delete("/api/deleteUser/:id", (req, res) => {
  const id = req.params.id;

  pool.query(
    "DELETE FROM users WHERE id=$1",
    [id],
    (err) => {
      if (err) console.log(err);
      else res.send("Deleted ✅");
    }
  );
});


// ▶️ START SERVER
app.listen(port, () => {
  console.log(`Server listening on port ${port}! 🚀`);
});