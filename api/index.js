import { createServer } from "http";
import express from "express";
import { Server as SocketIOServer } from "socket.io";
import path from "path";
import fetch from "node-fetch";
import fs from "fs/promises";



const httpServer = createServer();
const io = new SocketIOServer(httpServer);
const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));


// Gebruik de map 'public' voor statische resources, zoals stylesheets, afbeeldingen en client-side JavaScript
app.use(express.static('public'))
// use express with inject




app.get('/', async (request, response) => {
    response.render('index');
});

app.get('/about', async (request, response) => {
  response.render('about');
});

app.get('/projects', async (request, response) => {
  response.render('projects');
});

app.get('/contact', async (request, response) => {
  response.render('contact');
});


// Projects

// Routes om pagina's weer te geven 404
const projectPages = ['packables-web-development', 'project_barzaarblox', 'project_old_portfolio', 'dda_dutch_digital_agency', 'project_parcel_hub'];

projectPages.forEach(page => {
  app.get(`/projects/${page}`, (req, res) => {
    res.render('projects/' + page);
  });
});



// end of projects


const port = process.env.PORT || 8080;

httpServer.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Handle server error
httpServer.on("error", (e) => {
  if (e.code === "EADDRINUSE") {
    const address = httpServer.address();
    if (address !== null && typeof address !== "string") {
      const currentPort = address.port;
      const newPort = currentPort + 1;
      console.error(`Address ${currentPort} already in use, retrying on port ${newPort} in a few seconds...`);
      setTimeout(() => {
        httpServer.listen(newPort);
      }, 1000);
    } else {
      console.error(`Unable to retrieve server.`);
    }
  }
});

// Export the app
module.exports = app;
