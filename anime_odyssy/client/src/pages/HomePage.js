import logo from "../images/logo2.png";
import React, { useEffect, useState } from "react";
import { Box, Container, AppBar, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
// import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/HomePage.css";

const config = require("../config.json");

function HomePage() {
  const [animeForToday, setAnimeForToday] = useState({});
  const [topAnime, setTopAnime] = useState([]);
  const [topManga, setTopManga] = useState([]);
  const [recentAnime, setRecentAnime] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect((async) => {
    let timeout = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    fetch(`http://${config.server_host}:${config.server_port}/home/random`)
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson); // Debugging line
        setAnimeForToday(resJson);
        console.log(animeForToday); // Debugging line
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
    width: "1100px",
    height: "350px",
  };

  return isLoading ? (
    <div className="loading">
      <img src={logo} alt="loading" className="rotate" />
    </div>
  ) : (
    <div>
      <AppBar position="static" style={{ backgroundColor: "blue" }}>
        <Toolbar>
          <Typography variant="h6">Recommendation for today</Typography>
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
                </React.Fragment>
              </Box>
            </div>
          }
        </div>
      </Container>
      <AppBar position="static" style={{ backgroundColor: "blue" }}>
        <Toolbar>
          <Typography variant="h6">Recently released</Typography>
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
          <Typography variant="h6">Top 10 Anime</Typography>
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
          <Typography variant="h6">Top 10 Manga</Typography>
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
