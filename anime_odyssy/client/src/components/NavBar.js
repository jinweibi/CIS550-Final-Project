import { NavLink } from "react-router-dom";
import {
  AppBar,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { AuthContext } from "./AuthContex";
import { useContext } from "react";

// The hyperlinks in the NavBar contain a lot of repeated formatting code so a
// helper component NavText local to the file is defined to prevent repeated code.
const NavText = ({ href, text, isMain, onClick }) => {
  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) {
      onClick();
    }
  };
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
      {href ? (
        <NavLink
          to={href}
          style={{
            color: "inherit",
            textDecoration: "none",
          }}
        >
          {text}
        </NavLink>
      ) : (
        <span onClick={handleClick} style={{ cursor: "pointer" }}>
          {text}
        </span>
      )}
    </Typography>
  );
};

export default function NavBar() {
  const { isLoggedIn, handleLogout } = useContext(AuthContext);
  console.log(isLoggedIn);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <NavText href="/" text="ANIME ODYSSY" isMain />
          <NavText href="/anime" text="ANIMES" />
          <NavText href="/manga" text="MANGA" />
          {isLoggedIn && <NavText href="/favorite" text="Your Favorite" />}
          <div style={{ flexGrow: 1 }} />
          {isLoggedIn ? (
            <NavText onClick={handleLogout} text="LOGOUT" />
          ) : (
            <NavText href="/login" text="LOGIN" />
          )}
          <IconButton color="inherit" aria-label="search" href="/search">
            <SearchIcon />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
