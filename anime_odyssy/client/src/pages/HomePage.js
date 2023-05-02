import logo from "../images/logo2.png";
<<<<<<< HEAD
import pic from "../images/pic.webp";
import React, { useContext, useEffect, useState } from "react";
=======
import React, { useEffect, useState } from "react";
>>>>>>> yiling
import { Box, Container, AppBar, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
// import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/HomePage.css";
<<<<<<< HEAD
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { AuthContext } from "../components/AuthContex";
=======
>>>>>>> yiling

const config = require("../config.json");

function HomePage() {
<<<<<<< HEAD
  const { isLoggedIn, handleLogout } = useContext(AuthContext);
=======
>>>>>>> yiling
  const [animeForToday, setAnimeForToday] = useState({});
  const [topAnime, setTopAnime] = useState([]);
  const [topManga, setTopManga] = useState([]);
  const [recentAnime, setRecentAnime] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
<<<<<<< HEAD
  const [isFavorited, setIsFavorited] = useState({});
=======
>>>>>>> yiling

  useEffect((async) => {
    let timeout = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    fetch(`http://${config.server_host}:${config.server_port}/home/random`)
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson); // Debugging line
        setAnimeForToday(resJson);
<<<<<<< HEAD
        console.log(animeForToday.data[0]); // Debugging line
=======
        console.log(animeForToday); // Debugging line
>>>>>>> yiling
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
<<<<<<< HEAD
    const username = sessionStorage.getItem("username");
    console.log(username);
    const animeList = JSON.parse(sessionStorage.getItem("favorite_list"));
    console.log(animeList);
=======
>>>>>>> yiling
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
<<<<<<< HEAD
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

=======
    width: "1100px",
    height: "350px",
  };

>>>>>>> yiling
  return isLoading ? (
    <div className="loading">
      <img src={logo} alt="loading" className="rotate" />
    </div>
  ) : (
    <div>
      <AppBar position="static" style={{ backgroundColor: "blue" }}>
        <Toolbar>
<<<<<<< HEAD
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
              to={`${animeForToday.data[0].URL}`}
              style={{ color: "white" }}
            >
              {animeForToday.data[0].title}
            </NavLink>
          </h4>
=======
          <Typography variant="h6">Recommendation for today</Typography>
>>>>>>> yiling
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
<<<<<<< HEAD
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
              <Box style={specialCardStyle}>
                <React.Fragment>
                  <img
                    src={animeForToday.data[0].URL}
                    // src={pic}
                    alt={animeForToday.data[0].title}
                    style={{ width: "1150px", height: "350px" }}
                  />
=======
            <div key={animeForToday.title} style={{ width: `${cardWidth}px` }}>
              <Box style={specialCardStyle}>
                <React.Fragment>
                  <img
                    src={animeForToday.URL}
                    alt={animeForToday.title}
                    style={{ width: "1100px", height: "350px" }}
                  />

                  <h4>
                    <NavLink to={`${animeForToday.URL}`}>
                      {animeForToday.title}
                    </NavLink>
                  </h4>
>>>>>>> yiling
                </React.Fragment>
              </Box>
            </div>
          }
        </div>
      </Container>
      <AppBar position="static" style={{ backgroundColor: "blue" }}>
        <Toolbar>
<<<<<<< HEAD
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
=======
          <Typography variant="h6">Recently released</Typography>
>>>>>>> yiling
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
          {recentAnime.map((anime) => (
            <div key={anime.title} style={{ width: `${cardWidth}px` }}>
<<<<<<< HEAD
              {isLoggedIn && (
                <div
                  className="anime-card-favorite"
                  onClick={() => handleFavoriteClick(anime)}
                >
                  {isFavorited[anime.title] ? <FaHeart /> : <FaRegHeart />}
                </div>
              )}
=======
>>>>>>> yiling
              <Box style={cardStyle}>
                <React.Fragment>
                  <img
                    src={anime.URL}
                    alt={"logo"}
                    style={{ width: "200px", height: "200px" }}
                  />

                  <h4>
                    <NavLink to={`${anime.URL}`}>{anime.title}</NavLink>
                  </h4>
                </React.Fragment>
              </Box>
            </div>
          ))}
        </div>
      </Container>
      <AppBar position="static" style={{ backgroundColor: "blue" }}>
        <Toolbar>
<<<<<<< HEAD
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
=======
          <Typography variant="h6">Top 10 Anime</Typography>
>>>>>>> yiling
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
          {topAnime.map((anime) => (
            <div key={anime.title} style={{ width: `${cardWidth}px` }}>
<<<<<<< HEAD
              {isLoggedIn && (
                <div
                  className="anime-card-favorite"
                  onClick={() => handleFavoriteClick(anime)}
                >
                  {isFavorited[anime.title] ? <FaHeart /> : <FaRegHeart />}
                </div>
              )}
=======
>>>>>>> yiling
              <Box style={cardStyle}>
                <React.Fragment>
                  <img
                    src={anime.URL}
                    alt={"logo"}
                    style={{ width: "200px", height: "250px" }}
                  />

                  <h4>
                    <NavLink to={`${anime.URL}`}>{anime.title}</NavLink>
                  </h4>
                </React.Fragment>
              </Box>
            </div>
          ))}
        </div>
      </Container>
      <AppBar position="static" style={{ backgroundColor: "blue" }}>
        <Toolbar>
<<<<<<< HEAD
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
=======
          <Typography variant="h6">Top 10 Manga</Typography>
>>>>>>> yiling
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
          {topManga.map((anime) => (
            <div key={anime.title} style={{ width: `${cardWidth}px` }}>
<<<<<<< HEAD
              {isLoggedIn && (
                <div
                  className="anime-card-favorite"
                  onClick={() => handleFavoriteClick(anime)}
                >
                  {isFavorited[anime.title] ? <FaHeart /> : <FaRegHeart />}
                </div>
              )}
=======
>>>>>>> yiling
              <Box style={cardStyle}>
                <React.Fragment>
                  <img
                    src={anime.URL}
                    alt={"logo"}
                    style={{ width: "200px", height: "250px" }}
                  />

                  <h4>
                    <NavLink to={`${anime.URL}`}>{anime.title}</NavLink>
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
