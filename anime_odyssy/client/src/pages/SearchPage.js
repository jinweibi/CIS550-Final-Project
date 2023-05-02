import { useEffect, useState } from 'react';
import { Button,Checkbox, Box,FormControlLabel, TextField,Grid, Container ,AppBar, Toolbar, Typography, Tabs, Tab,Select, FormControl, InputLabel, MenuItem} from '@mui/material';
import { NavLink } from 'react-router-dom';
import AnimeCard from '../components/AnimeCard';
import { Link } from 'react-router-dom';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';


const config = require('../config.json');

export default function AnimePage() {
  const [all_mangas, setMangas] = useState([]);
  const [searchtitle, setSearchtitle] = useState([]);
  const [title, setTitle] = useState('');

//   useEffect(() => {
//     fetch(`http://${config.server_host}:${config.server_port}/all_animes`)
//       .then((res) => res.json())
//       .then((resJson) => setMangas(resJson));
//   }, []);


 
//   useEffect(() => {
//     fetch(`http://${config.server_host}:${config.server_port}/searchtitle/${title}`)
//       .then((res) => res.json())
//       .then((resJson) => setSearchtitle(resJson));
//   }, []);

  
const search = () => {
    fetch(`http://${config.server_host}:${config.server_port}/searchtitle/${title}`)
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson.length === 0) {
          setSearchtitle(null);
        } else {
          setSearchtitle(resJson);
        }
      });
  };
  
  
  useEffect(() => {
    search();
  }, []);
  
  return (
    <Container>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
        <div>
          <h2>Search Anime/Manga</h2>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <TextField label='Title' value={title} onChange={(e) => setTitle(e.target.value)}style={{ width: "100%", maxWidth: "500px" }}/>
            </Grid>
            <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
              <Button variant="contained" color="secondary"  onClick={() => search()} style={{ width: "100%" }}>
                Search
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
  
      <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
        <div>
          <h2>Results</h2>
          <div
            style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}
          >
            {searchtitle.map((manga) => (
              <div
                style={{
                  flex: "8",
                  display: "flex",
                  flexWrap: "wrap",
                  marginLeft: "15px",
                }}
              >
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
                  <h1 style={{ fontSize: "24px", fontFamily: "Palatino, serif" }}><strong>{manga.title}</strong> </h1>
                  <img
                    src={manga.URL}
                    alt="logo"
                    style={{ width: "100%", height: "auto" }}
                  />
                </Box>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
  

//   return (


// <Container>
// <h2>Search Songs</h2>
// <Grid container spacing={6}>
//   <Grid item xs={8}>
//     <TextField label='Title' value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: "80%" }}/>
//   </Grid>
//   <Grid item xs={4} sm={12}>
//     <Button variant="contained" color="secondary"  onClick={() => search()} style={{ left: '50%', transform: 'translateX(-50%)' }}>
//       Search
//     </Button>
//   </Grid>
//   <Grid item xs={12}>
//         <h2>Results</h2>
//         <div
//       style={{ display: "flex", justifyContent: "flex-start", marginLeft: 0 }}
//     >
//         {searchtitle.map((manga) => (
//         //   <p key={title.title}>{title.title}</p>
//         <div
//         style={{
//           flex: "8",
//           display: "flex",
//           flexWrap: "wrap",
//           marginLeft: "15px",
//         }}
//       >
//           <Box
//           key={manga.title}
//           p={3}
//           m={2}
//           style={{
//             background: "white",
//             borderRadius: "20px",
//             border: "2px solid #000",
//             width: "250px",
//           }}
//         >
//           {/* <h1>{manga.names}</h1> */}
//           <h1 style={{ fontSize: "24px", fontFamily: "Palatino, serif" }}><strong>{manga.title}</strong> </h1>
//           <img
//             src={manga.URL}
//             alt="logo"
//             style={{ width: "100%", height: "auto" }}
//           />
//           {/* <h4> <Link onClick={() => setSelectedAnimeId(manga)}>
//               {manga.name}
//             </Link></h4> */}
//         </Box>
//         </div>
        
//         ))}
//         </div>
//       </Grid>
// </Grid>

// {/* <h2>Results</h2> */}
// </Container>

//   );
  
}