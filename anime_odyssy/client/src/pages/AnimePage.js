import { useEffect, useState } from 'react';
import { Button, Box, Container ,AppBar, Toolbar, Typography, Tabs, Tab,Select, FormControl, InputLabel, MenuItem} from '@mui/material';
import { NavLink } from 'react-router-dom';
import AnimeCard from '../components/AnimeCard';
import { Link } from 'react-router-dom';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';


const config = require('../config.json');

export default function AnimePage() {
  const [all_mangas, setMangas] = useState([]);
  const [filteredAnimes, setFilteredAnimes] = useState([]);
  const [value, setValue] = useState(0);
  const [genreFilter, setGenreFilter] = useState("");
  const [scoreFilter, setScoreFilter] = useState("");
  const [genreScoreFilter, setGenreScoreFilter] = useState([]);
  const [selectedAnimeId, setSelectedAnimeId] = useState(null);

  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/all_animes`)
      .then((res) => res.json())
      .then((resJson) => setMangas(resJson));
  }, []);

  useEffect(() => {
    if (genreFilter === "") {
      setFilteredAnimes(all_mangas);
    } else {
      setFilteredAnimes(
        all_mangas.filter((manga) => manga.genres.includes(genreFilter))
      );
    }
  }, [genreFilter, all_mangas]);

  useEffect(() => {
    if (genreFilter === "") {
      setFilteredAnimes(all_mangas);
    } else {
      setFilteredAnimes(
        all_mangas.filter((manga) => manga.genres.includes(genreFilter))
      );
    }
  }, [genreFilter, all_mangas]);

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
        setGenreFilter("Adventure");
        break;
      case 3:
        setGenreFilter("Drama");
        break;
      case 4:
        setGenreFilter("Fantasy");
        break;
      case 5:
        setGenreFilter("Horror");
        break;
      case 6:
        setGenreFilter("Supernatural");
        break;
      case 7:
        setGenreFilter("Comedy");
        break;
      case 8:
        setGenreFilter("Sci-Fi");
        break;
      default:
        break;
    }
  };

  const handleScoreChange = (event) => {
    const selectedScore = event.target.value;
    setScoreFilter(selectedScore);
    const filteredByGenre = all_mangas.filter((manga) => manga.genres.includes(genreFilter));
    switch (selectedScore) {
      case "1":
        setFilteredAnimes(
          filteredByGenre.filter((manga) => manga.score >= 0 && manga.score < 1)
        );
        break;
      case "2":
        setFilteredAnimes(
          filteredByGenre.filter((manga) => manga.score >= 1 && manga.score < 2)
        );
        break;
      case "3":
        setFilteredAnimes(
          filteredByGenre.filter((manga) => manga.score >= 2 && manga.score < 3)
        );
        break;
      case "4":
        setFilteredAnimes(
          filteredByGenre.filter((manga) => manga.score >= 3 && manga.score < 4)
            .filter((manga) => manga.genres.includes(genreFilter))
        );
        break;
      case "5":
        setFilteredAnimes(
          filteredByGenre.filter((manga) => manga.score >= 4 && manga.score < 5)
            .filter((manga) => manga.genres.includes(genreFilter))
        );
        break;
      case "6":
        setFilteredAnimes(
          filteredByGenre.filter((manga) => manga.score >= 5 && manga.score < 6)
            .filter((manga) => manga.genres.includes(genreFilter))
        );
        break;
      case "7":
        setFilteredAnimes(
          filteredByGenre.filter((manga) => manga.score >= 6 && manga.score < 7)
            .filter((manga) => manga.genres.includes(genreFilter))
        );
        break;
      case "8":
        setFilteredAnimes(
          filteredByGenre.filter((manga) => manga.score >= 7 && manga.score < 8)
            .filter((manga) => manga.genres.includes(genreFilter))
        );
        break;
      case "9":
        setFilteredAnimes(
          filteredByGenre.filter((manga) => manga.score >= 8 && manga.score < 9)
            .filter((manga) => manga.genres.includes(genreFilter))
        );
        break;
      case "10":
        setFilteredAnimes(
          filteredByGenre.filter((manga) => manga.score >= 9 && manga.score <= 10)
            .filter((manga) => manga.genres.includes(genreFilter))
        );
        break;
      default:
        setFilteredAnimes(filteredByGenre);
        break;
    }
  };

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
     setMenuOpen(!menuOpen);
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
        {selectedAnimeId && <AnimeCard title={selectedAnimeId.title} duration={selectedAnimeId.total_duration} favorites={selectedAnimeId.favorites} score={selectedAnimeId.score} url={selectedAnimeId.URL}handleClose={() => setSelectedAnimeId(null)} />}
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
            <h4> <Link onClick={() => setSelectedAnimeId(manga)}>
                {manga.title}
              </Link></h4>
          </Box>
        ))}
      </div>

      <div style={{ float: 'right' }}>
      <div onClick = {toggleMenu} style={{ marginRight: '16px', minWidth: '200px' }}>
      <Box
      sx={{
        '& > :not(style)': {
          m: 2,
        },
      }}
    >
      <FormatListBulletedIcon sx={{ fontSize: 80, color: "secondary" }}>Filter</FormatListBulletedIcon>
      </Box>
      </div>
      </div>
      {menuOpen && (


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
            color: "white",
          }}
        >
          <Tab label="All" style={{ color: "white" }}/>
          <Tab label="Action" style={{ color: "white" }}/>
          <Tab label="Adventure" style={{ color: "white" }}/>
          <Tab label="Drama" style={{ color: "white" }}/>
          <Tab label="Fantasy" style={{ color: "white" }}/>
          <Tab label="Horror" style={{ color: "white" }}/>
          <Tab label="Supernatural" style={{ color: "white" }}/>
          <Tab label="Comedy" style={{ color: "white" }}/>
          <Tab label="Sci-Fi" style={{ color: "white" }}/>
        </Tabs>
        <FormControl fullWidth >
          <InputLabel id="demo-simple-select-label" style={{ color: "white" }}>Score</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={scoreFilter}
            label="Score"
            onChange={handleScoreChange}
            style={{
              borderLeft: "1px solid #ddd",
              backgroundColor: "#483D8B",
              marginRight: "80px",
            }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="1">0-1</MenuItem>
            <MenuItem value="2">1-2</MenuItem>
            <MenuItem value="3">2-3</MenuItem>
            <MenuItem value="4">3-4</MenuItem>
            <MenuItem value="5">4-5</MenuItem>
            <MenuItem value="6">5-6</MenuItem>
            <MenuItem value="7">6-7</MenuItem>
            <MenuItem value="8">7-8</MenuItem>
            <MenuItem value="9">8-9</MenuItem>
            <MenuItem value="10">9-10</MenuItem>
          </Select>
        </FormControl>
      </div >
      )}
    </div>
  );
  
}