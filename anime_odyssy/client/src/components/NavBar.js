import { NavLink } from "react-router-dom";
import {
  AppBar,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

// The hyperlinks in the NavBar contain a lot of repeated formatting code so a
// helper component NavText local to the file is defined to prevent repeated code.
const NavText = ({ href, text, isMain }) => {
  return (
    <Typography
      variant={isMain ? "h5" : "h7"}
      noWrap
      style={{
        marginRight: "30px",
        fontFamily: "Papyrus",
        fontWeight: 300,
        letterSpacing: ".3rem",
      }}
    >
      <NavLink
        to={href}
        style={{
          color: "inherit",
          textDecoration: "none",
        }}
      >
        {text}
      </NavLink>
    </Typography>
  );
};

export default function NavBar() {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <NavText href="/" text="ANIME ODYSSY" isMain />
          <NavText href="/all_animes" text="ANIMES" />
          <NavText href="/all_mangas" text="MANGA" />
          <NavText href="/funfacts" text="FunFacts" />
          <div style={{ flexGrow: 1 }} />
          <NavText href="/login" text="LOGIN" />
          <IconButton color="inherit" aria-label="search" href="/searchtitle">
            <SearchIcon />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
