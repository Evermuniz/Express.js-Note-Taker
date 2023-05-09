//routing module for the landing page

//using the express module 
const express = require("express");

//notesRouter module is a custom module that defines a route for the /notes path
const notesRouter = require("./notes");

//assigning express to the new app variable
const app = express();

//this assigns the notesRouter module with the express app so the /notes path uses the notesRouter module
app.use("/notes", notesRouter);

//exporting the app module
module.exports = app;
