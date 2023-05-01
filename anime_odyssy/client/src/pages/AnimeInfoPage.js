import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box,Container, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { NavLink } from 'react-router-dom';

import AnimeCard from '../components/AnimeCard';
const config = require('../config.json');

export default function AnimeInfoPage() {
  const { animeTitle } = useParams();
  const [anime, setAnimeData] = useState({});
  // const [selectedAnimeId, setSelectedAnimeId] = useState(null);

  useEffect(() => {
    // fetch(`http://${config.server_host}:${config.server_port}/home/anime/${animeTitle}`)
    fetch(`http://${config.server_host}:${config.server_port}/home/anime/${animeTitle}`)
      .then(res => res.json())
      .then(resJson => setAnimeData(resJson));

  }, [animeTitle]);
  console.log(anime.data[0]);
  console.log(anime.length);
  const title = anime[0]?.title;
  console.log(title);


  return (

<Container style={{ display: 'flex', flexDirection: 'row-reverse' }}>
    {/* {all_animes.map((anime) => */}
      <Box
        key={anime.title}
        p={3}
        m={2}
        style={{ background: 'white', borderRadius: '20px', border: '2px solid #000' }}
      >
        
        <img
          src={anime.data[0].URL}
          // alt={`${anime.source} anime art`}
          alt = {`${anime.source} `}
          // style={{float: 'left'}}
          // style={{ maxWidth: "100%", maxHeight: "100%", display: "block" }}
          // style={{ width: "auto", height: "auto" }}
          style={{ width: "200px", height: "250px" }}
        />
       
        <h4><NavLink to={`${anime.URL}`}>{anime.title}</NavLink></h4>
      </Box>
    {/* )} */}
    </Container>
    // <Container>
      
    //   {selectedAnimeId && <AnimeCard songId={selectedAnimeId} handleClose={() => setSelectedAnimeId(null)} />}
    //   {all_animes.map((animeData) =>
    //   <Stack direction='row' justify='center'>
      
    //     <img
    //       key={animeData.title}
    //       src={animeData.URL}
    //       alt={`${animeData.title} `}
    //       style={{
    //         marginTop: '40px',
    //         marginRight: '40px',
    //         marginBottom: '40px'
    //       }}
    //     />
        
    //     <Stack>
    //       <h1 style={{ fontSize: 64 }}>{animeData.title}</h1>
    //       <h2>Released: {animeData.start_date}</h2>
    //     </Stack>
      
    //   </Stack>
    //    )}
    //   <TableContainer>
    //     <Table>
    //       <TableHead>
    //         <TableRow>
    //           <TableCell key='#'>#</TableCell>
    //           <TableCell key='Score'>Score</TableCell>
    //           <TableCell key='Favorites'>Favorites</TableCell>
    //           <TableCell key='Duration'>Duration</TableCell>
    //         </TableRow>
    //       </TableHead>
    //       <TableBody>
            
    // {/* //         {
    // //           // TODO (TASK 23): render the table content by mapping the songData array to <TableRow> elements
    // //           // Hint: the skeleton code for the very first row is provided for you. Fill out the missing information and then use a map function to render the rest of the rows.
    // //           // Hint: it may be useful to refer back to LazyTable.js
    // //           <TableRow key={songData[0].song_id}>
    // //             <TableCell key='#'>{songData[0].number}</TableCell>
    // //             <TableCell key='Title'>
    // //               <Link onClick={() => setSelectedSongId(songData[0].song_id)}>
    // //                 Replace me
    // //                 {songData[0].title}
    // //               </Link>
    // //             </TableCell>
    // //             <TableCell key='Plays'>{songData[0].plays}</TableCell>
    // //             <TableCell key='Duration'>{formatDuration(songData[0].duration)}</TableCell>
    // //           </TableRow>
    // //         } */}


    //         {/* {songData.map((row) => */}
    //          <TableRow key={animeData.title}>
    //            <TableCell key='#'>{animeData.title}</TableCell>
    //            <TableCell key='Title'>
    //                <Link onClick={() => setSelectedAnimeId(animeData.title)}>
    //                  {animeData.title}
    //                </Link>
    //              </TableCell>
    //             <TableCell key='Favorites'>{animeData.favorites}</TableCell>
    //              <TableCell key='Duration'>{animeData.total_duration}</TableCell>
    //          </TableRow>
    //         {/* )} */}

    //       </TableBody>
    //     </Table>
    //    </TableContainer>
      
    //  </Container>
     
  );
}