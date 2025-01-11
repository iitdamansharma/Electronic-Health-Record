import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import HttpError from "./models/http-error.js";
import { register, login, getUsers, logout } from "./controllers/users-controllers.js";
import { postHeartHealth, postLipid, postSugar, postUrine } from "./controllers/post-tests-controllers.js";
import { getLipid, getSugar, getUrine, gethearthealth } from "./controllers/get-tests-controllers.js";
import { IsAuthorized } from "./middleware/IsAuthorized.js";
import cookieParser from "cookie-parser";
import { config } from 'dotenv';
import cors from "cors";
config(); 

const {DBusername , DBpassword , PORT=8000} = process.env

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
  origin: "https://ehr2-0-frontend-2-0.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.post("/register", register);
app.post("/login", login);
app.get("/logout", logout);
app.get("/getuser", IsAuthorized, getUsers);

app.post("/hearthealth", postHeartHealth);
app.post("/lipid", postLipid);
app.post("/sugar", postSugar);
app.post("/urine", postUrine);

app.get("/hearthealth/:user", gethearthealth);
app.get("/lipid/:user", getLipid);
app.get("/sugar/:user", getSugar);
app.get("/urine/:user", getUrine);


app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

mongoose
  .connect(
    `mongodb+srv://${DBusername}:${DBpassword}@subhamdb.ubqol0o.mongodb.net/EHR?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Server Running");
    app.listen(PORT);
  })
  .catch(err => {
    console.log(err);
  });