// import React, { useState, useEffect } from "react";
// import logo from "../images/logo2.png";
// import "../styles/HomePage.css";
// import { Container, Divider, Link } from '@mui/material';
// import { NavLink } from 'react-router-dom';

// function HomePage() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [AnimeOfTheDay, setAnimeOfTheDay] = useState({});
//   useEffect(() => {
//     // Simulate loading data from API
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 500);

//     fetch(`http://${config.server_host}:${config.server_port}/random`)
//       .then(res => res.json())
//       .then(resJson => setSongOfTheDay(resJson));
//   }, []);


//   const AnimeColumns = [
//     {
//       field: 'title',
//       headerName: 'Song Title',
//       renderCell: (row) => <Link onClick={() => setSelectedSongId(row.song_id)}>{row.title}</Link> // A Link component is used just for formatting purposes
//     },
//     {
//       field: 'album',
//       headerName: 'Album',
//       renderCell: (row) => <NavLink to={`/albums/${row.album_id}`}>{row.album}</NavLink> // A NavLink component is used to create a link to the album page
//     },
//     {
//       field: 'plays',
//       headerName: 'Plays'
//     },
//   ];

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

import React, { useState, useEffect } from "react";
import { makeStyles } from 'tss-react/mui';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AnimeCard from '../components/AnimeCard';
const config = require("../config.json");

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  section: {
    marginBottom: theme.spacing(4),
  },
  title: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(2),
  },
}));

const HomePage = () => {
  const [AnimeOfTheDay, setAnimeOfTheDay] = useState(null);
  const [topAnime, setTopAnime] = useState([]);
  const [topManga, setTopManga] = useState([]);
  const [recentAnime, setRecentAnime] = useState([]);
  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/home/random`)
      .then(res => res.json())
      .then(resJson => setAnimeOfTheDay(resJson));
      console.log(AnimeOfTheDay);
    fetch(`http://${config.server_host}:${config.server_port}/home/recent_animes`)
      .then(res => res.json())
      .then(resJson => setRecentAnime(resJson));
    fetch(`http://${config.server_host}:${config.server_port}/home/top_10_anime?type=anime`)
      .then(res => res.json())
      .then(resJson => setTopAnime(resJson));
    fetch(`http://${config.server_host}:${config.server_port}/home/top_10_anime?type=manga`)
      .then(res => res.json())
      .then(resJson => setTopManga(resJson));
  }, []);
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Box className={classes.section}>
        <Typography variant="h4" className={classes.title}>
          Top 10 Anime
        </Typography>
        <Grid container spacing={2}>
          {topAnime.map((anime) => (
            <Grid item key={anime.id} xs={6} sm={4} md={3}>
              <AnimeCard anime={anime} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box className={classes.section}>
        <Typography variant="h4" className={classes.title}>
          Top 10 Manga
        </Typography>
        <Grid container spacing={2}>
          {topManga.map((manga) => (
            <Grid item key={manga.id} xs={6} sm={4} md={3}>
              <AnimeCard anime={manga} />
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box className={classes.section}>
        <Typography variant="h4" className={classes.title}>
          Recently Added Anime
        </Typography>
        <Grid container spacing={2}>
          {recentAnime.map((anime) => (
            <Grid item key={anime.id} xs={6} sm={4} md={3}>
              <AnimeCard anime={anime} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default HomePage;