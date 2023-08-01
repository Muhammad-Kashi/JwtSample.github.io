const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const secretKey = "secretkey";

//Sample Api
app.get("/", (req, res) => {
  res.json({
    message: "a sample api",
  });
});

//login Api
app.post("/login", (req, res) => {
  // fake user bec we are not using database
  const user = {
    id: 1,
    username: "kashif",
    email: "kashif@gmail.com",
  };

  jwt.sign({ user }, secretKey, { expiresIn: "300s" }, (err, token) => {
    res.json({
      token,
    });
  });
});

//Profile api
app.post("/profile",verifyToken,(req, res) => {
  jwt.verify(req.token,secretKey,(err, authData) => {
    if (err) {
    res.send({result : "invalid Token"})}
    else{
        res.json({
            message:"Profile accessed",
            authData
        })
    }
  })
});

function verifyToken(req, res,next) {
    const bearerHeader=req.headers['authorization'];
if(typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const token =bearer[1];
        req.token=token;
        next();
}
else{
    res.send({
        result:"Token is not valid"
    })
}
}


app.listen(5000, () => {
  console.log("app is running on 5000 port");
})
