<<<<<<< HEAD
import { useEffect, useState } from 'react';
import { Box, Button, ButtonGroup, Link, Modal } from '@mui/material';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { NavLink } from 'react-router-dom';

import { formatDuration } from '../helpers/formatter';
const config = require('../config.json');

// SongCard is a modal (a common example of a modal is a dialog window).
// Typically, modals will conditionally appear (specified by the Modal's open property)
// but in our implementation whether the Modal is open is handled by the parent component
// (see HomePage.js for example), since it depends on the state (selectedSongId) of the parent
// export default function AnimeCard({ animeTitle,handleClose }) {
  export default function AnimeCard({ title, duration, favorites, score,handleClose }) {
  
  const [barRadar, setBarRadar] = useState(true);
  const [all_animes, setAnimes] = useState([]);

  // useEffect(() => {
  //   fetch(`http://${config.server_host}:${config.server_port}/home/anime/${animeTitle}`)
  //     .then(res => res.json())
  //     .then(resJson => setAnimes(resJson));
  // }, [animeTitle]);
  
  // console.log(all_animes);
  // console.log(all_animes.length);
  

  // const chartData = [
  //   { name: 'Score', value: all_animes.score },
  //   { name: 'Favorites', value: all_animes.favorites },
  //   { name: 'Duration', value: all_animes.total_duration },
  // ];

  const chartData = [
    
    { name: 'Score', value: (score*100) },
    { name: 'Favorites', value: (favorites/100)},
    { name: 'Duration', value: duration },
  ];

  const handleGraphChange = () => {
    setBarRadar(!barRadar);
  };

  return (
    <Modal
      open={true}
      onClose={handleClose}
      style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Box
        p={3}
        style={{ background: 'white', borderRadius: '16px', border: '2px solid #000', width: 600 }}
      >
        <h1>{title}</h1>
        <h2>Anime:&nbsp;
          {/* <NavLink to={`${all_animes.URL}`}>{all_animes.title}</NavLink> */}
        </h2>
        <p>Duration: {duration}</p>
        {/* <p>Favorites: {songData.tempo} bpm</p>
        <p>Key: {songData.key_mode}</p> */}
        <ButtonGroup>
          <Button disabled={barRadar} onClick={handleGraphChange}>Bar</Button>
          <Button disabled={!barRadar} onClick={handleGraphChange}>Radar</Button>
        </ButtonGroup>
        <div style={{ margin: 20 }}>
          { // This ternary statement returns a BarChart if barRadar is true, and a RadarChart otherwise
            barRadar
              ? (
                <ResponsiveContainer height={250}>
                  <BarChart
                    data={chartData}
                    layout='vertical'
                    margin={{ left: 40 }}
                  >
                    <XAxis type='number' domain={[0, 1]} />
                    <YAxis type='category' dataKey='name' />
                    <Bar dataKey='value' stroke='#8884d8' fill='#8884d8' />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <ResponsiveContainer height={250}>
                  
                  <RadarChart outerRadius={100} width={160} height={100} data={chartData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="name" />
                      <PolarRadiusAxis angle={30} domain={[0, 1]} />
                      <Radar name="title" dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.5} />
                      {/* <Radar name="Lily" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} /> */}
                      {/* <Legend /> */}
                    </RadarChart>

                </ResponsiveContainer>
              )
          }
        </div>
        <Button onClick={handleClose} style={{ left: '50%', transform: 'translateX(-50%)' }} >
          Close
        </Button>
      </Box>
    </Modal>
  );


}
=======
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "tss-react/mui";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    borderRadius: theme.spacing(1),
    overflow: "hidden",
    boxShadow: theme.shadows[0],
    "&:hover": {
      boxShadow: theme.shadows[2],
      cursor: "pointer",
    },
  },
  media: {
    height: 0,
    paddingTop: "150%",
    backgroundColor: theme.palette.grey[200],
    position: "relative",
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  content: {
    flex: "1 0 auto",
    padding: theme.spacing(2),
  },
}));

function AnimeCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media}>
        <img
          className={classes.media}
          src={props.anime.URL}
          alt={props.anime.title}
        />
      </CardMedia>
      <CardContent className={classes.content}>
        <Typography variant="h6" gutterBottom>
          {props.anime.title}
        </Typography>
      </CardContent>
    </Card>
  );
}

AnimeCard.propTypes = {
  anime: PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default AnimeCard;
>>>>>>> 126ce8a5211f51340585dce1d4327711b06424cb
