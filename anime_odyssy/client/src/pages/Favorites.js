import logo from "../images/logo2.png";
import pic from "../images/pic.webp";
import React, { useContext, useEffect, useState } from "react";
import { Box, Container, AppBar, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
// import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/HomePage.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { AuthContext } from "../components/AuthContex";

const config = require("../config.json");

function Favorites() {
  const { isLoggedIn, handleLogout } = useContext(AuthContext);
  const [favoriteAnimes, setfavoriteAnimes] = useState([]);
  const [display, setDisplay] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState({});
  const username = sessionStorage.getItem("username");

  useEffect(() => {
    let timeout = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    fetch(
      `http://${config.server_host}:${config.server_port}/get_user_favorite/${username}`
    )
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);
        setfavoriteAnimes(resJson);

        //     // Create an array of promises that fetches each anime
        //     const animePromises = resJson.map((anime) =>
        //       fetch(
        //         `http://${config.server_host}:${config.server_port}/anime/${anime.source}/${anime.title}`
        //       )
        //         .then((res) => res.json())
        //         .catch((error) => console.error(error))
        //     );

        //     // Wait for all promises to resolve before updating state
        //     Promise.all(animePromises).then((animeData) => {
        //       console.log(animeData);
        //       setfavoriteAnimes(animeData);
        //     });
        //     console.log(favoriteAnimes);
        //   })
        //   .catch((error) => {
        //     console.error(error);
      });

    return () => clearTimeout(timeout);
  }, []);

  const cardWidth = 250;

  const cardStyle = {
    background: "white",
    borderRadius: "20px",
    border: "2px solid #000",
    width: `${cardWidth}px`,
    height: "350px",
    padding: "16px",
  };

  const specialCardStyle = {
    border: "2px solid #000",
    width: "1150px",
    height: "350px",
  };

  const handleFavoriteClick = (anime) => {
    const { source, title } = anime; // extract the source and title properties
    const username = sessionStorage.getItem("username");
    setIsFavorited((prevState) => ({
      ...prevState,
      [title]: !prevState[title],
    }));

    if (isFavorited[title]) {
      // Send a request to the backend with the source and title properties
      fetch(
        `http://${config.server_host}:${config.server_port}/add_favorite/${username}/${title}/${source}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          alert(data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // Send a request to the backend with the source and title properties
      fetch(
        `http://${config.server_host}:${config.server_port}/dele_favorite/${username}/${title}/${source}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          alert(data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return isLoading ? (
    <div className="loading">
      <img src={logo} alt="loading" className="rotate" />
    </div>
  ) : (
    <div>
      <Container>
        {favoriteAnimes && favoriteAnimes.length > 0 ? (
          <div
            style={{
              display: "flex",
              overflowX: "auto",
              gap: "20px",
            }}
          >
            {favoriteAnimes.map((anime) => (
              <div key={anime.title} style={{ width: `${cardWidth}px` }}>
                {isLoggedIn && (
                  <div
                    className="anime-card-favorite"
                    onClick={() => handleFavoriteClick(anime)}
                  >
                    {isFavorited[anime.title] ? <FaRegHeart /> : <FaHeart />}
                  </div>
                )}
                <Box style={cardStyle}>
                  <React.Fragment>
                    <img
                      src={anime.URL}
                      alt={anime.title}
                      style={{ width: "200px", height: "200px" }}
                    />

                    <h4>
                      <NavLink to={`${anime.URL}`}>{anime.title}</NavLink>
                    </h4>
                  </React.Fragment>
                </Box>
              </div>
            ))}
          </div>
        ) : (
          <Typography variant="h6" style={{ marginTop: "16px" }}>
            You haven't added any favorites yet!
          </Typography>
        )}
      </Container>
    </div>
  );
}

export default Favorites;
