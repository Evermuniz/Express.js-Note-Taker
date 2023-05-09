//notes router module

//requiring the express module 
const notes = require('express').Router();
//loading the fsUtils module from the helper file to read and write
const { readFromFile, readAndAppend } = require("../helpers/fsUtils");
//loading the uuid module from the helper file to generate unique id's
const uuid = require("../helpers/uuid");
const fs = require('fs');

//defining a route for the GET method which parses the data from the db.json file
notes.get("/", (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});



//defining a route for the POST method to create a new note and add it to the db.json file
notes.post("/", (req, res) => {
  console.info(`${req.method} request received to add a note`);
  console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title: title,
      text: text,
      id: uuid(), //unique id 
    };

    readAndAppend(newNote, "./db/db.json"); //append new note to the file
    res.json(``);
  } else {
    res.error("Error in adding note");
  }
});

//defining a route for the delete method to remove it from the db.json file
notes.delete("/:id", (req, res) => {
  console.info(`${req.method} request received to delete a note`);

  const noteId = req.params.id; //noteId from the request

  const notes = JSON.parse(fs.readFileSync("./db/db.json")); //parsing and reading the db file

  const filteredNotes = notes.filter((note) => note.id !== noteId); //filetering notes to those that don't have the noteId to be deleted

  fs.writeFileSync("./db/db.json", JSON.stringify(filteredNotes)); //stringifying the new filteredNotes

  res.status(200).send(`Note with id ${noteId} deleted.`);
});


module.exports = notes;