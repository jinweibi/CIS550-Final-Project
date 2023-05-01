import { useEffect, useState } from 'react';
import { Box, Container ,AppBar, Toolbar, Typography, Tabs, Tab,Select, FormControl, InputLabel, MenuItem} from '@mui/material';
import { NavLink } from 'react-router-dom';

const config = require('../config.json');

export default function AnimePage() {
  const [all_animes, setAnimes] = useState([]);

  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/all_animes?type=manga`)
      .then(res => res.json())
      .then(resJson => setAnimes(resJson));
  }, []);

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


  return (
    <Container maxWidth="xl" style={{ display: 'flex', justifyContent: 'flex-start', marginLeft: 0 }}>
      <Container style={{ flex: '4', display: 'flex', flexWrap: 'wrap', marginLeft: '15px' }}>
        {all_animes.map((manga) =>
          <Box
            key={manga.title}
            p={3}
            m={2}
            style={{ background: 'white', borderRadius: '20px', border: '2px solid #000', width: '250px' }}
          >
            <img
              src={manga.URL}
              alt="logo"
              style={{ width: '100%', height: 'auto' }}
            />
            <h4><NavLink to={`${manga.URL}`}>{manga.title}</NavLink></h4>
          </Box>
        )}
      </Container>
      <div style={{ flex: '1', minWidth: '200px', justifyContent: 'flex-end', marginLeft: 'auto'}}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          style={{ borderLeft: '1px solid #ddd', backgroundColor: '#E7F0FA', justifyContent: 'flex-end', marginLeft: 'auto'}}
        >
          <Tab label="All" />
          <Tab label="Action" />
          <Tab label="Comedy" />
          <Tab label="Drama" />
        </Tabs>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Score</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={all_animes.score}
            label="Score"
            onChange={handleChange}
            style={{ borderLeft: '1px solid #ddd', backgroundColor: '#E7F0FA' }}
          >
            <MenuItem value={1}>One</MenuItem>
            <MenuItem value={2}>Two</MenuItem>
            <MenuItem value={3}>Three</MenuItem>
          </Select>
        </FormControl>
      </div>
    </Container>
  );
  
}