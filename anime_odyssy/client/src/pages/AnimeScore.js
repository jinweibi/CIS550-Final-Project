import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import SongCard from '../components/AnimeCard';
import { formatDuration, formatReleaseDate } from '../helpers/formatter';
const config = require('../config.json');

export default function AlbumInfoPage() {
  const { animes_score } = useParams();

  const [songData, setSongData] = useState([{}]); // default should actually just be [], but empty object element added to avoid error in template code
  const [albumData, setAlbumData] = useState([]);

  const [selectedSongId, setSelectedSongId] = useState(null);

  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/home/${animes_score}`)
      .then(res => res.json())
      .then(resJson => setAlbumData(resJson));

    fetch(`http://${config.server_host}:${config.server_port}/album_songs/${album_id}`)
      .then(res => res.json())
      .then(resJson => setSongData(resJson));
  }, [album_id]);

  return (
    <Container>
      {selectedSongId && <SongCard songId={selectedSongId} handleClose={() => setSelectedSongId(null)} />}
      <Stack direction='row' justify='center'>
        <img
          key={albumData.album_id}
          src={albumData.thumbnail_url}
          alt={`${albumData.title} album art`}
          style={{
            marginTop: '40px',
            marginRight: '40px',
            marginBottom: '40px'
          }}
        />
        <Stack>
          <h1 style={{ fontSize: 64 }}>{albumData.title}</h1>
          <h2>Released: {formatReleaseDate(albumData.release_date)}</h2>
        </Stack>
      </Stack>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell key='#'>#</TableCell>
              <TableCell key='Title'>Title</TableCell>
              <TableCell key='Plays'>Plays</TableCell>
              <TableCell key='Duration'>Duration</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            
           
            {songData.map((row) =>
            <TableRow key={row.songId}>
              <TableCell key='#'>{row.number}</TableCell>
                <TableCell key='Title'>
                  <Link onClick={() => setSelectedSongId(row.song_id)}>
                    {row.title}
                  </Link>
                </TableCell>
                <TableCell key='Plays'>{row.plays}</TableCell>
                <TableCell key='Duration'>{formatDuration(row.duration)}</TableCell>
            </TableRow>
          )}

          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}