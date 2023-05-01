const express = require("express");
const cors = require("cors");
const config = require("./config");
const routes = require("./routes");

const app = express();
app.use(
  cors({
    origin: "*",
  })
);

// We use express to define our various API endpoints and
// provide their handlers that we implemented in routes.js
app.get("/login", routes.login);
app.get("/register", routes.register);
app.get("/home/random", routes.random);
app.get("/home/top_10_anime", routes.top_animes);
app.get("/top_10_manga", routes.top_mangas);
app.get("/home/recent_animes", routes.recent_10_animes);
app.get("/search", routes.search);
app.get("/character/:character_id", routes.get_character_id);
app.get("/anime/:source/:title", routes.get_manga_anime_info);
app.get("/favorite/:username", routes.get_favorite);
app.get("/all_animes", routes.all_animes);
app.get("all_mangas", routes.all_animes);

app.listen(config.server_port, () => {
  console.log(
    `Server running at http://${config.server_host}:${config.server_port}/`
  );
});

module.exports = app;
