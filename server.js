const express = require("express"); //using express
const path = require("path"); //require path to join down below
const api = require("./routes"); //setting api to be routes

const PORT = process.env.PORT || 3001; //port for heroku

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api); //using api defined above

//using the public folder as the static route
app.use(express.static("public"));

// GET Route for homepage
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "/public/index.html")));


// GET Route for notes page
app.get("/notes", (req, res) => res.sendFile(path.join(__dirname, "/public/notes.html")));

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT} 🚀`));
