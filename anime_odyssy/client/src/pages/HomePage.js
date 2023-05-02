import logo from "../images/logo2.png";
import pic from "../images/pic.webp";
import React, { useContext, useEffect, useState } from "react";
import { Box, Container, AppBar, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
// import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/HomePage.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { AuthContext } from "../components/AuthContex";
import AnimeCard from "../components/AnimeCard";

const config = require("../config.json");

function HomePage() {
  const { isLoggedIn, handleLogout } = useContext(AuthContext);
  const [animeForToday, setAnimeForToday] = useState({});
  const [topAnime, setTopAnime] = useState([]);
  const [topManga, setTopManga] = useState([]);
  const [recentAnime, setRecentAnime] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState({});
  const [selectedAnimeId, setSelectedAnimeId] = useState(null);

  useEffect((async) => {
    let timeout = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    fetch(`http://${config.server_host}:${config.server_port}/home/random`)
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson); // Debugging line
        setAnimeForToday(resJson);
        console.log(animeForToday.data[0]); // Debugging line
      })
      .catch((error) => {
        console.error(error);
      });
    fetch(
      `http://${config.server_host}:${config.server_port}/home/recent_animes`
    )
      .then((res) => res.json())
      .then((resJson) => {
        setRecentAnime(resJson);
        console.log(recentAnime);
      });
    fetch(
      `http://${config.server_host}:${config.server_port}/home/top_10_anime?type=anime`
    )
      .then((res) => res.json())
      .then((resJson) => {
        setTopAnime(resJson);
        console.log(topAnime);
      });
    fetch(
      `http://${config.server_host}:${config.server_port}/home/top_10_anime?type=manga`
    )
      .then((res) => res.json())
      .then((resJson) => {
        setTopManga(resJson);
        console.log(topManga);
      });
    const username = sessionStorage.getItem("username");
    console.log(username);
    const animeList = JSON.parse(sessionStorage.getItem("favorite_list"));
    console.log(animeList);
    return () => clearTimeout(timeout); // Clear timeout on unmount
  }, []);

  const cardWidth = 250;

  const cardStyle = {
    background: "white",
    borderRadius: "20px",
    border: "2px solid #000",
    width: `${cardWidth}px`,
    height: "350px",
    padding: "16px",
  };

  const specialCardStyle = {
    border: "2px solid #000",
    width: "1150px",
    height: "350px",
  };

  const handleFavoriteClick = (anime) => {
    const { source, title, URL } = anime; // extract the source and title properties
    const username = sessionStorage.getItem("username");
    setIsFavorited((prevState) => ({
      ...prevState,
      [title]: !prevState[title],
    }));

    if (!isFavorited[title]) {
      console.log(URL);
      // Send a request to the backend with the source and title properties
      fetch(
        `http://${config.server_host}:${config.server_port}/add_favorite/${username}/${title}/${source}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          alert(data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // Send a request to the backend with the source and title properties
      fetch(
        `http://${config.server_host}:${config.server_port}/dele_favorite/${username}/${title}/${source}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          alert(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return isLoading ? (
    <div className="loading">
      <img src={logo} alt="loading" className="rotate" />
    </div>
  ) : (
    <div>
      <AppBar position="static" style={{ backgroundColor: "blue" }}>
        <Toolbar>
          <Typography
            style={{
              fontFamily: "Papyrus",
              fontWeight: 300,
              letterSpacing: ".1rem",
            }}
            variant="h6"
          >
            Recommendation for today:{" "}
          </Typography>
          <h4>
            <NavLink
              onClick={() => setSelectedAnimeId(animeForToday)}
              style={{ color: "white" }}
            >
              {animeForToday.data[0].title}
            </NavLink>
          </h4>
        </Toolbar>
      </AppBar>
      <Container>
        <div
          style={{
            display: "flex",
            overflowX: "auto",
            gap: "20px",
          }}
        >
          {
            <div
              key={animeForToday.data[0].title}
              style={{ width: `${cardWidth}px` }}
            >
              {isLoggedIn && (
                <div
                  className="anime-card-favorite"
                  onClick={() => handleFavoriteClick(animeForToday.data[0])}
                >
                  {isFavorited[animeForToday.data[0].title] ? (
                    <FaHeart />
                  ) : (
                    <FaRegHeart />
                  )}
                </div>
              )}
              {selectedAnimeId && (
                <AnimeCard
                  title={selectedAnimeId.title}
                  duration={selectedAnimeId.total_duration}
                  favorites={selectedAnimeId.favorites}
                  score={selectedAnimeId.score}
                  url={selectedAnimeId.URL}
                  handleClose={() => setSelectedAnimeId(null)}
                />
              )}
              <Box style={specialCardStyle}>
                <React.Fragment>
                  <img
                    src={animeForToday.data[0].URL}
                    // src={pic}
                    alt={animeForToday.data[0].title}
                    style={{ width: "1150px", height: "350px" }}
                  />
                </React.Fragment>
              </Box>
            </div>
          }
        </div>
      </Container>
      <AppBar position="static" style={{ backgroundColor: "blue" }}>
        <Toolbar>
          <Typography
            style={{
              fontFamily: "Papyrus",
              fontWeight: 300,
              letterSpacing: ".1rem",
            }}
            variant="h6"
          >
            Recently released
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <div
          style={{
            display: "flex",
            overflowX: "auto",
            gap: "20px",
          }}
        >
          {selectedAnimeId && (
            <AnimeCard
              title={selectedAnimeId.title}
              duration={selectedAnimeId.total_duration}
              favorites={selectedAnimeId.favorites}
              score={selectedAnimeId.score}
              url={selectedAnimeId.URL}
              handleClose={() => setSelectedAnimeId(null)}
            />
          )}
          {recentAnime.map((anime) => (
            <div key={anime.title} style={{ width: `${cardWidth}px` }}>
              {isLoggedIn && (
                <div
                  className="anime-card-favorite"
                  onClick={() => handleFavoriteClick(anime)}
                >
                  {isFavorited[anime.title] ? <FaHeart /> : <FaRegHeart />}
                </div>
              )}
              <Box style={cardStyle}>
                <React.Fragment>
                  <img
                    src={anime.URL}
                    alt={"logo"}
                    style={{ width: "200px", height: "200px" }}
                  />

                  <h4>
                    <NavLink onClick={() => setSelectedAnimeId(anime)}>
                      {anime.title}
                    </NavLink>
                  </h4>
                </React.Fragment>
              </Box>
            </div>
          ))}
        </div>
      </Container>
      <AppBar position="static" style={{ backgroundColor: "blue" }}>
        <Toolbar>
          <Typography
            style={{
              fontFamily: "Papyrus",
              fontWeight: 300,
              letterSpacing: ".1rem",
            }}
            variant="h6"
          >
            Top 10 Anime
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <div
          style={{
            display: "flex",
            overflowX: "auto",
            gap: "20px",
          }}
        >
          {selectedAnimeId && (
            <AnimeCard
              title={selectedAnimeId.title}
              duration={selectedAnimeId.total_duration}
              favorites={selectedAnimeId.favorites}
              score={selectedAnimeId.score}
              url={selectedAnimeId.URL}
              handleClose={() => setSelectedAnimeId(null)}
            />
          )}
          {topAnime.map((anime) => (
            <div key={anime.title} style={{ width: `${cardWidth}px` }}>
              {isLoggedIn && (
                <div
                  className="anime-card-favorite"
                  onClick={() => handleFavoriteClick(anime)}
                >
                  {isFavorited[anime.title] ? <FaHeart /> : <FaRegHeart />}
                </div>
              )}
              <Box style={cardStyle}>
                <React.Fragment>
                  <img
                    src={anime.URL}
                    alt={"logo"}
                    style={{ width: "200px", height: "250px" }}
                  />

                  <h4>
                    <NavLink onClick={() => setSelectedAnimeId(anime)}>
                      {anime.title}
                    </NavLink>
                  </h4>
                </React.Fragment>
              </Box>
            </div>
          ))}
        </div>
      </Container>
      <AppBar position="static" style={{ backgroundColor: "blue" }}>
        <Toolbar>
          <Typography
            style={{
              fontFamily: "Papyrus",
              fontWeight: 300,
              letterSpacing: ".1rem",
            }}
            variant="h6"
          >
            Top 10 Manga
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <div
          style={{
            display: "flex",
            overflowX: "auto",
            gap: "20px",
          }}
        >
          {selectedAnimeId && (
            <AnimeCard
              title={selectedAnimeId.title}
              duration={selectedAnimeId.total_duration}
              favorites={selectedAnimeId.favorites}
              score={selectedAnimeId.score}
              url={selectedAnimeId.URL}
              handleClose={() => setSelectedAnimeId(null)}
            />
          )}
          {topManga.map((anime) => (
            <div key={anime.title} style={{ width: `${cardWidth}px` }}>
              {isLoggedIn && (
                <div
                  className="anime-card-favorite"
                  onClick={() => handleFavoriteClick(anime)}
                >
                  {isFavorited[anime.title] ? <FaHeart /> : <FaRegHeart />}
                </div>
              )}
              <Box style={cardStyle}>
                <React.Fragment>
                  <img
                    src={anime.URL}
                    alt={"logo"}
                    style={{ width: "200px", height: "250px" }}
                  />

                  <h4>
                    <NavLink onClick={() => setSelectedAnimeId(anime)}>
                      {anime.title}
                    </NavLink>
                  </h4>
                </React.Fragment>
              </Box>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default HomePage;
