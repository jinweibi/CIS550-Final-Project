import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";

// import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
// import "./App.css";
import Login from "./pages/Login";
import NavBar from "./components/NavBar";
import Register from "./pages/Register";
import { AuthProvider } from "./components/AuthContex";
import Favorites from "./pages/Favorites";
import AnimePage from "./pages/AnimePage";
import MangaPage from "./pages/MangaPage";
import FunFact from "./pages/FunFact";
import SearchPage from "./pages/SearchPage";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#f442d6",
    },
    background: {
      default: "#f442d6",
      paper: "#f5f5f5",
    },
    primary: {
      main: "#f442d6",
    },
    background: {
      default: "#f442d6",
      paper: "#f5f5f5",
    },
  },
});

// App is the root component of our application and as children contain all our pages
// We use React Router's BrowserRouter and Routes components to define the pages for
// our application, with each Route component representing a page and the common
// NavBar component allowing us to navigate between pages (with hyperlinks)
function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login/:username/:password" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/favorite" element={<Favorites />} />
            <Route path="/all_animes" element={<AnimePage />} />
            <Route path="/all_mangas" element={<MangaPage />} />
            <Route path="/funfacts" element={<FunFact />} />
            <Route path="/searchtitle" element={<SearchPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
