require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");

const cookieSession = require("cookie-session");
const passportStrategy = require("./passport");
const authRoute = require("./routes/auth");

const app = express();

app.use(
  cookieSession({
    name: "session",
    keys: ["ProNav"],
    maxAge: 24 * 60 * 60 * 100,
  })
);


app.use(
  cors({
    origin: "http://localhost:3000",
    // Allow requests from this origin

    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    // Allow cookies to be sent with the request (if you need this)
  })
);

app.use("/auth", authRoute);

app.use(passport.initialize());
app.use(passport.session());



const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listenting on port ${port}...`));
