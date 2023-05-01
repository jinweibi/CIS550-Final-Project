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