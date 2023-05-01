// import React, { useState, useEffect } from "react";
// import { makeStyles } from "tss-react/mui";
// import { AppBar, Toolbar, Typography, Container, Grid } from "@mui/material";
// import AnimeCard from "../components/AnimeCard";
// const config = require("../config.json");
// import logo from "../images/logo2.png";
// import "../styles/HomePage.css";

// function HomePage() {
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // Simulate loading data from API
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 500);
//   }, []);

//   return (
//     <div>
//       {isLoading ? (
//         <div className="loading">
//           <img src={logo} alt="loading" className="rotate" />
//         </div>
//       ) : (
//         <div>
//           <h1>Welcome to the Homepage!</h1>
//           <p>Your data has been loaded.</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default HomePage;

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   appBar: {
//     backgroundColor: "#000000", // Change this to your desired background color
//   },
//   toolbar: {
//     justifyContent: "space-between",
//   },
//   content: {
//     paddingTop: theme.spacing(4),
//     paddingBottom: theme.spacing(4),
//   },
// }));

// function HomePage() {
//   const classes = useStyles();
//   const [animeForToday, setAnimeForToday] = useState({});
//   const [topAnime, setTopAnime] = useState([]);
//   const [topManga, setTopManga] = useState([]);
//   const [recentAnime, setRecentAnime] = useState([]);

//   useEffect(() => {
//     fetch(`http://${config.server_host}:${config.server_port}/home/random`)
//       .then((res) => res.json())
//       .then((resJson) => {
//         console.log(resJson); // Debugging line
//         setAnimeForToday(resJson);
//         console.log(animeForToday); // Debugging line
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//     fetch(
//       `http://${config.server_host}:${config.server_port}/home/recent_animes`
//     )
//       .then((res) => res.json())
//       .then((resJson) => {
//         setRecentAnime(resJson);
//         console.log(recentAnime);
//       });
//     fetch(
//       `http://${config.server_host}:${config.server_port}/home/top_10_anime?type=anime`
//     )
//       .then((res) => res.json())
//       .then((resJson) => {
//         setTopAnime(resJson);
//         console.log(topAnime);
//       });
//     fetch(
//       `http://${config.server_host}:${config.server_port}/home/top_10_anime?type=manga`
//     )
//       .then((res) => res.json())
//       .then((resJson) => {
//         setTopManga(resJson);
//         console.log(topManga);
//       });
//   }, []);

//   const recentlyAddedAnime = [
//     // Array of objects representing the 10 most recently added anime/manga
//   ];

//   const randomAnime = {
//     // Object representing a randomly recommended anime/manga
//   };

//   return (
//     <div className={classes.root}>
//       <AppBar position="static" className={classes.appBar}>
//         <Toolbar className={classes.toolbar}>
//           <Typography variant="h6" color="inherit">
//             Your Anime For Today: {animeForToday.title}
//           </Typography>
//         </Toolbar>
//       </AppBar>
//       <Container maxWidth="lg" className={classes.content}>
//         <Grid container spacing={4}>
//           <Grid item xs={12}>
//             <Typography
//               variant="h4"
//               component="h2"
//               gutterBottom
//               color="inherit"
//             >
//               Top 10 Anime/Manga
//             </Typography>
//           </Grid>
//           {topAnime.map((anime) => (
//             <Grid item key={anime.title} xs={12} sm={6} md={4} lg={3}>
//               <AnimeCard anime={anime} />
//             </Grid>
//           ))}
//           <Grid item xs={12}>
//             <Typography
//               variant="h4"
//               component="h2"
//               gutterBottom
//               color="inherit"
//             >
//               Recently Added Anime/Manga
//             </Typography>
//           </Grid>
//           {recentAnime.map((anime) => (
//             <Grid item key={anime.title} xs={12} sm={6} md={4} lg={3}>
//               <AnimeCard anime={anime} />
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//     </div>
//   );
// }

// export default HomePage;

import React, { useEffect, useState } from "react";
import { Box, Container, AppBar, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
// import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const config = require("../config.json");

export default function HomePage() {
  const [animeForToday, setAnimeForToday] = useState({});
  const [topAnime, setTopAnime] = useState([]);
  const [topManga, setTopManga] = useState([]);
  const [recentAnime, setRecentAnime] = useState([]);

  useEffect(() => {
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

  return (
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
            <div
              key={animeForToday.data[0].title}
              style={{ width: `${cardWidth}px` }}
            >
              <Box style={specialCardStyle}>
                <React.Fragment>
                  <img
                    src={animeForToday.data[0].URL}
                    alt={animeForToday.data[0].title}
                    style={{ width: "1100px", height: "350px" }}
                  />

                  <h4>
                    <NavLink to={`${animeForToday.data[0].URL}`}>
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
