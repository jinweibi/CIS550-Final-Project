import { useEffect, useState } from 'react';
import { Button, Box, Container ,AppBar, Toolbar, Typography, Tabs, Tab,Select, FormControl, InputLabel, MenuItem} from '@mui/material';
import { NavLink } from 'react-router-dom';
// import { Button, Checkbox, Container, FormControlLabel, Grid, Link, Slider, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const config = require('../config.json');

export default function AnimePage() {
  const [all_animes, setAnimes] = useState([]);
  const [filteredAnimes, setFilteredAnimes] = useState([]);
  const [value, setValue] = useState(0);
  const [genreFilter, setGenreFilter] = useState("");

  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/all_mangas`)
      .then((res) => res.json())
      .then((resJson) => setAnimes(resJson));
  }, []);

  useEffect(() => {
    if (genreFilter === "") {
      setFilteredAnimes(all_animes);
    } else {
      setFilteredAnimes(
        all_animes.filter((manga) => manga.genres.includes(genreFilter))
      );
    }
  }, [genreFilter, all_animes]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    switch (newValue) {
      case 0:
        setGenreFilter("");
        break;
      case 1:
        setGenreFilter("Action");
        break;
      case 2:
        setGenreFilter("Comedy");
        break;
      case 3:
        setGenreFilter("Drama");
        break;
      default:
        break;
    }
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "flex-start", marginLeft: 0 }}
    >
      <div
        style={{
          flex: "8",
          display: "flex",
          flexWrap: "wrap",
          marginLeft: "15px",
        }}
      >
        {filteredAnimes.map((manga) => (
          <Box
            key={manga.title}
            p={3}
            m={2}
            style={{
              background: "white",
              borderRadius: "20px",
              border: "2px solid #000",
              width: "250px",
            }}
          >
            <img
              src={manga.URL}
              alt="logo"
              style={{ width: "100%", height: "auto" }}
            />
            <h4>
              <NavLink to={`${manga.URL}`}>{manga.title}</NavLink>
            </h4>
          </Box>
        ))}
      </div>
      <div 
        style={{
          flex: "1",
          minWidth: "200px",
          justifyContent: "center",
          width: "100%" ,
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          style={{
            borderLeft: "1px solid #ddd",
            backgroundColor: "#483D8B",
            marginRight: "80px" ,
          }}
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
            style={{ borderLeft: "1px solid #ddd", backgroundColor: "#483D8B", marginRight: "80px" , }}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={3}>4</MenuItem>
            <MenuItem value={3}>5</MenuItem>
            <MenuItem value={3}>6</MenuItem>
            <MenuItem value={3}>7</MenuItem>
          </Select>
        </FormControl>
      </div >
    </div>
  );
  
}