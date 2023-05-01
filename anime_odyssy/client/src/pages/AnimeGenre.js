// import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { Container, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import { useEffect, useState } from 'react';
import { Box, Container ,AppBar, Toolbar, Typography, Tabs, Tab,Select, FormControl, InputLabel, MenuItem} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';


import SongCard from '../components/AnimeCard';
import { formatDuration, formatReleaseDate } from '../helpers/formatter';
const config = require('../config.json');

export default function AnimeGenre() {
  const { animes_genre } = useParams();
  const [all_animes, setAnimes] = useState([]);

  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/home/all_animes/${animes_genre}`)
      .then(res => res.json())
      .then(resJson => setAnimes(resJson));

  }, [animes_genre]);

  console.log(all_animes);
  console.log(all_animes.length);
  const flexFormat = { display: 'flex', flexDirection: 'row-reverse', flexWrap: 'wrap', justifyContent: 'space-evenly' ,alignItems: 'center'
};

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
    setValue(newValue);
    };



  return (
    // <div>
    // <AppBar position="static">
    //     <Toolbar>
    //       <Typography variant="h6">Top Anime Titles</Typography>
    //     </Toolbar>
    //   </AppBar>
    <Container style={{ display: 'flex', flexDirection: 'row-reverse' }}>
      <div style={{ marginRight: '16px', minWidth: '200px' }}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          style={{ borderLeft: '1px solid #ddd', backgroundColor: '#E7F0FA' }}
        >
        <Tab label="Action" component = {Link} to = "/home/all_animes/ACTION"/>

        <Tab label="Adeventure" component = {Link} to = "/home/all_animes/Adventure"/>
        <Tab label="Award Winning" component = {Link} to = "/home/all_animes/Award Winning"/>
        <Tab label="Drama" component = {Link} to = "/home/all_animes/Drama"/>
        <Tab label="Fantasy" component = {Link} to = "/home/all_animes/Fantasy"/>
        <Tab label="Horror" component = {Link} to = "/home/all_animes/Horror"/>
        <Tab label="Supernatural" component = {Link} to = "/home/all_animes/Supernatural"/>
        <Tab label="Comedy" component = {Link} to = "/home/all_animes/Comedy"/>
        <Tab label="Sci-Fi" component = {Link} to = "/home/all_animes/Sci-Fi"/>
        </Tabs>
        {/* <Box mt={4}>
          <h4>Filters:</h4>
          <ul>
            <li>Filter 1</li>
            <li>Filter 2</li>
            <li>Filter 3</li>
          </ul>
        </Box> */}
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Score</InputLabel>
        {/* {all_animes.map((anime) => */}
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={all_animes.score}
            label="Score"
            onChange={handleChange}
            style={{ borderLeft: '1px solid #ddd', backgroundColor: '#E7F0FA' }}
        >
            <MenuItem value={1} component = {Link} to = "/login">One</MenuItem>
            <MenuItem value={2}>Two</MenuItem>
            <MenuItem value={3}>Three</MenuItem>
        </Select>
        {/* )} */}
        </FormControl>
      </div>
    <Container style={flexFormat}>
      {all_animes.map((anime) =>
        <Box
          key={anime.title}
          p={3}
          m={2}
          style={{ background: 'white', borderRadius: '20px', border: '2px solid #000' }}
        >
          
          <img
            src={anime.URL}
            // alt={`${anime.source} anime art`}
            alt = {"logo"}
            // style={{float: 'left'}}
            // style={{ maxWidth: "100%", maxHeight: "100%", display: "block" }}
            // style={{ width: "auto", height: "auto" }}
            style={{ width: "200px", height: "250px" }}
          />
         
          <h4><NavLink to={`${anime.URL}`}>{anime.title}</NavLink></h4>
        </Box>
      )}
    </Container>
    </Container>
    // </div>
  );

}