import { useEffect, useState } from "react";
import {
  Button,
  Box,
  Container,
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import AnimeCard from "../components/AnimeCard";
import { Link } from "react-router-dom";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import logo from "../images/logo2.png";

const config = require("../config.json");

export default function FunPage() {
  const [all_mangas, setMangas] = useState([]);
  const [differentcolors, setHaircolors] = useState([]);
  const [popularcharacters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let timeout = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    fetch(
      `http://${config.server_host}:${config.server_port}/funfacts/whitehair`
    )
      .then((res) => res.json())
      .then((resJson) => setMangas(resJson));
    return () => clearTimeout(timeout); // Clear timeout on unmount
  }, []);

  useEffect(() => {
    fetch(
      `http://${config.server_host}:${config.server_port}/funfacts/differenthair`
    )
      .then((res) => res.json())
      .then((resJson) => setHaircolors(resJson));
  }, []);

  useEffect(() => {
    fetch(`http://${config.server_host}:${config.server_port}/popular`)
      .then((res) => res.json())
      .then((resJson) => setCharacters(resJson));
  }, []);

  console.log(all_mangas);
  console.log(all_mangas.length);

  return isLoading ? (
    <div className="loading">
      <img src={logo} alt="loading" className="rotate" />
    </div>
  ) : (
    <div>
      <div
        style={{
          backgroundColor: "#483D8B",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <h1 style={{ color: "white", padding: "20px" }}>
          Do you know the characters who have the white hair and appear in the
          animes with genres "Action", "Adventure", "Comedy", "Fantasy"?
        </h1>
      </div>
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
          {all_mangas.map((manga) => (
            <Box
              key={manga.names}
              p={3}
              m={2}
              style={{
                background: "white",
                borderRadius: "20px",
                border: "2px solid #000",
                width: "250px",
              }}
            >
              {/* <h1>{manga.names}</h1> */}
              <h1 style={{ fontSize: "24px", fontFamily: "Palatino, serif" }}>
                <strong>{manga.names}</strong>{" "}
              </h1>
              {/* <img
              src={manga.names}
              alt="logo"
              style={{ width: "100%", height: "auto" }}
            /> */}
              {/* <h4> <Link onClick={() => setSelectedAnimeId(manga)}>
                {manga.name}
              </Link></h4> */}
            </Box>
          ))}
        </div>
      </div>

      <div
        style={{
          backgroundColor: "#483D8B",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <h1 style={{ color: "white", padding: "20px" }}>
          Do you know the count of different hair colors for female characters
          among the top 10 highest rated manga between 2010 and 2020?
        </h1>
      </div>

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
          {differentcolors.map((haircolor) => (
            <Box
              key={haircolor.hair_color}
              p={3}
              m={2}
              style={{
                // background: "white",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                borderRadius: "20px",
                border: "2px solid #000",
                width: "250px",
              }}
            >
              {/* <h1>{haircolor.hair_color}</h1>
            <h1>{haircolor.color_num}</h1> */}
              <h1
                style={{ fontSize: "24px", fontFamily: "Verdana, sans-serif" }}
              >
                <strong>{haircolor.hair_color} : </strong> {haircolor.color_num}
              </h1>
            </Box>
          ))}
        </div>
      </div>

      <div
        style={{
          backgroundColor: "#483D8B",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <h1 style={{ color: "white", padding: "20px" }}>
          Do you know the popular female and male characters and their hair
          color among 2020-2023 TOP 10 mangas?
        </h1>
      </div>

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
          {popularcharacters.map((characters) => (
            <Box
              key={characters.name}
              p={3}
              m={2}
              style={{
                // backgroundColor: "rgba(255, 255, 255, 0.8)",
                // backgroundColor: "rgba(153, 102, 204, 0.8)",
                background: "white",
                borderRadius: "20px",
                border: "2px solid #000",
                width: "250px",
              }}
            >
              <h1
                style={{
                  fontSize: "24px",
                  fontFamily: "Helvetica, sans-serif",
                }}
              >
                <strong>Name:</strong> {characters.names}
              </h1>
              <h1 style={{ fontSize: "20px", fontFamily: "Georgia, serif" }}>
                <strong>Hair Color:</strong> {characters.hair_color}
              </h1>
              <h1
                style={{ fontSize: "18px", fontFamily: "Verdana, sans-serif" }}
              >
                <strong>Fav:</strong> {characters.favorites}
              </h1>
              <h1 style={{ fontSize: "18px", fontFamily: "Palatino, serif" }}>
                <strong>Gender:</strong> {characters.gender}
              </h1>
            </Box>
          ))}
        </div>
      </div>
    </div>
  );
}
