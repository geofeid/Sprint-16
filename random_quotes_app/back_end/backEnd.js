"use strict";

// -- Imports & Constants --
import express from "express";

import { quotesJackHandey } from "./public/quotes.js";
import mongoose from "mongoose";
import { Quote } from "./models/quote.js";
import path from 'path';
import {fileURLToPath} from 'url';


const app = express();
const PORT = 3050;


const dbURI =
  "mongodb+srv://admin:admin@cluster0.vxt84.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";




app.set("view engine", "ejs");


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/public", express.static(__dirname + "/public")); //Fixed not loading css in your guides-solution
app.use(express.urlencoded({ extended: true }));


mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000), console.log("connected to DB"))
  .catch((err) => console.log(err));


app.listen(PORT, () => {
  console.log(
    `Your random_quotes server has been started, and is listening on port ${PORT}.`
  );
});


app.get("/", (request, response) => {

  response.redirect("/quotes");
});


app.get("/about", (request, response) => {
  response.render("about.ejs");
});


app.get("/quotes/create", (req, res) => {
  res.render("create");
});


app.post("/quotes", (req, res) => {
  console.log(req.body);
  const newQuote = new Quote(req.body);
  newQuote
    .save()
    .then((result) => {
      res.redirect("/quotes");
    })
    .catch((err) => {
      console.log(err);
    });
});


app.get("/quotes", (req, res) => {
  Quote.find().then((result) => {
    res.render("index", { quotes: result });
  });
});


app.get("/quotes/:id", (req, res) => {
  console.log(req.params.id);
  const id = req.params.id;
  Quote.findById(id).then((result) => {
    console.log(result);
    res.render("details", { quote: result });
  });
});

app.delete("/quotes/:id", (req, res) => {
  console.log(req.params.id);
  const id = req.params.id;
  Quote.findByIdAndDelete(id).then((result) => {
    console.log(result);
    res.json({ redirect: "/quotes" });
  });
});


app.get("/randomJS", (request, response) => {
  const randomNumber = Math.floor(Math.random() * quotesJackHandey.length);
  console.log(randomNumber);

  let randomQuote = quotesJackHandey[randomNumber];

  response.send(randomQuote);
});

app.use((req, res) => {
  res.status(404).render("404.ejs");
});
