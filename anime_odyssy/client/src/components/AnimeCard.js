import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from 'tss-react/mui';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: theme.spacing(1),
    overflow: 'hidden',
    boxShadow: theme.shadows[0],
    '&:hover': {
      boxShadow: theme.shadows[2],
      cursor: 'pointer',
    },
  },
  media: {
    height: 0,
    paddingTop: '150%',
    backgroundColor: theme.palette.grey[200],
    position: 'relative',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  content: {
    flex: '1 0 auto',
    padding: theme.spacing(2),
  },
}));

function AnimeCard(props) {
    const classes = useStyles();
  
    return (
      <Card className={classes.root}>
        <CardMedia className={classes.media}>
          <img className={classes.media} src={props.anime.url} alt={props.anime.title} />
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