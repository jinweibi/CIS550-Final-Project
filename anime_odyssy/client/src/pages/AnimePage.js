import { useEffect, useState } from 'react';
import { Box, Container ,AppBar, Toolbar, Typography, Tabs, Tab,Select, FormControl, InputLabel, MenuItem, IconButton} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import {MenuIcon} from '@material-ui/icons/Menu';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Icon from '@mui/material/Icon';
import { green } from '@mui/material/colors';
import AnimeCard from '../components/AnimeCard';

const config = require('../config.json');

export default function AnimePage() {
  const [all_animes, setAnimes] = useState([]);
  const [selectedAnimeId, setSelectedAnimeId] = useState(null);

  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/home/all_animes`)
      .then(res => res.json())
      .then(resJson => setAnimes(resJson));
  }, []);

  console.log(all_animes);
  console.log(all_animes.length);
  // flexFormat provides the formatting options for a "flexbox" layout that enables the album cards to
  // be displayed side-by-side and wrap to the next line when the screen is too narrow. Flexboxes are
  // incredibly powerful. You can learn more on MDN web docs linked below (or many other online resources)
  // https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Flexbox
  const flexFormat = { display: 'flex', flexDirection: 'row-reverse', flexWrap: 'wrap', justifyContent: 'space-evenly' ,alignItems: 'center'
 };

 const [value, setValue] = useState(0);

 const handleChange = (event, newValue) => {
   setValue(newValue);
 };

 const [menuOpen, setMenuOpen] = useState(false);

 const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  


  


  return (
    
    <Container style={{ display: 'flex', flexDirection: 'row-reverse' }}>
        <Container style={flexFormat}>
  {selectedAnimeId && <AnimeCard title={selectedAnimeId.title} duration={selectedAnimeId.total_duration} favorites={selectedAnimeId.favorites} score={selectedAnimeId.score} handleClose={() => setSelectedAnimeId(null)} />}
  {all_animes.map((anime) =>
    <Box
      key={anime.title}
      p={3}
      m={2}
      style={{ background: 'white', borderRadius: '20px', border: '2px solid #000' }}
    >
      
      <img
        src={anime.URL}
        alt = {"logo"}
        style={{ width: "200px", height: "250px" }}
      />
     
     <h4> <Link onClick={() => setSelectedAnimeId(anime)}>
                {anime.title}
              </Link></h4>
      {/* <p>Duration: {anime.total_duration}</p>
      <p>Favorites: {anime.favorites}</p>
      <p>Score: {anime.score}</p> */}
    </Box>
  )}
</Container>




        {/* <Container style={flexFormat}>
        {selectedAnimeId && <AnimeCard animeTitle={selectedAnimeId} handleClose={() => setSelectedAnimeId(null)} />}
      {all_animes.map((anime) =>
        <Box
          key={anime.title}
          p={3}
          m={2}
          style={{ background: 'white', borderRadius: '20px', border: '2px solid #000' }}
        >
          
          <img
            src={anime.URL}
            alt = {"logo"}
            style={{ width: "200px", height: "250px" }}
          />
         
         <h4> <Link onClick={() => setSelectedAnimeId(anime.title)}>
                    {anime.title}
                  </Link></h4>
        </Box>
      )}
    </Container> */}
    <div style={{ float: 'right' }}>
      <div onClick = {toggleMenu} style={{ marginRight: '16px', minWidth: '200px' }}>
      <Box
      sx={{
        '& > :not(style)': {
          m: 2,
        },
      }}
    >
      {/* <FormatListBulletedIcon>add_circle</FormatListBulletedIcon>
      <FormatListBulletedIcon color="primary">add_circle</FormatListBulletedIcon>
      <FormatListBulletedIcon sx={{ color: green[500] }}>add_circle</FormatListBulletedIcon>
      <FormatListBulletedIcon fontSize="small">add_circle</FormatListBulletedIcon> */}
      <FormatListBulletedIcon sx={{ fontSize: 80, color: "secondary" }}>Filter</FormatListBulletedIcon>
      </Box>
      </div>
      </div>
      {menuOpen && (
        <div>
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
            <MenuItem value={1} component = {Link} to = "/home/login">One</MenuItem>
            <MenuItem value={2}>Two</MenuItem>
            <MenuItem value={3}>Three</MenuItem>
        </Select>
        {/* )} */}
        </FormControl>
      
    {/* <Container style={flexFormat}>
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
    </Container> */}
    </div>
    // </Container>
        // </div>
      )}
        
    </Container>
  );
}



