import express, { RequestHandler } from "express";
import { logger } from "./middleware/logger";
import memberApi from "./routes/api/members";
import exphbs = require("express-handlebars");
import path = require("path");
import memberData = require("./repo/Members");
// 1)Creates the app object from express
const app = express();

// 2)Init middleware
//Middleware functions are unctions with acess to the request an response
app.use(express.json()); // to parse json in the body requests
app.use(express.urlencoded({ extended: false })); // to handle url enconded data (Form Data)
app.use(logger);

// (Optiona A)Template engine server
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views/")); // this is required because we have srs in the folder structure
app.get("/", (req, res) =>
  res.render("index", {
    title: "Member App", // to pass data to the handlebar
    members: memberData.members
  })
);

// (Option B)register routes for API server
app.use("/api/members", memberApi);

// (Option C) static folder server
// Set a static folder: to make an html server.
// Server that serves html pages.
app.use(express.static(path.join(__dirname, "public")));

// "/" means Default route: localhost:<PORT>/
//app.get("/", (request, response) => {
// Sends the string to the client:
//response.send("<h1>Hello World test </h1>");
// Send a file:
//response.sendFile(path.join(__dirname, "public", "index.html"));
//});

// uste the environment port if its available otherwise Use 500 in development
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
