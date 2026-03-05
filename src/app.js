import express from 'express';
import defaultRouter from './routers/routes.js';
import session from "express-session";

//configure Express.js app
const app = express();

//view engine
app.set("view engine", "ejs");
app.set("views", "src/views");

//static directories
app.use(express.static('public'));

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//create express app
//Enable sessin first
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

//Attach useer to every request second
// Attach user to every request SECOND
app.use((req, res, next) => {
  if (req.session.user) {
    req.user = req.session.user;
  } else {
    req.user = null;
  }
  next();
});


//Mount routers last
app.use("/", defaultRouter);

export default app;