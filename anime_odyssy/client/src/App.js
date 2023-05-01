import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";

// import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
// import "./App.css";
import Login from "./pages/Login";
import NavBar from "./components/NavBar";
<<<<<<< HEAD
import AnimePage from "./pages/AnimePage";
import AnimeGenre from "./pages/AnimeGenre";
import AnimeInfoPage from "./pages/AnimeInfoPage";
// import Register from "./pages/Register";
=======
import Register from "./pages/Register";
>>>>>>> 126ce8a5211f51340585dce1d4327711b06424cb
// import AnimePage from "./pages/AnimePage";
// import FunPage from "./pages/FunPage";

export const theme = createTheme({
  palette: {
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/:username/:password" element={<Login />} />
<<<<<<< HEAD
          <Route path="/home/all_animes" element={<AnimePage />} />
          <Route path="/home/all_animes/:animes_genre" element={<AnimeGenre />} />
          <Route path="/home/anime/:get_anime_card" element={<AnimeInfoPage />} />
          {/* <Route
            path="/register/:username/:password/:gender/:age"
            element={<Register />}
          />
          <Route path="/anime" element={<AnimePage />} />
=======
          <Route path="/register" element={<Register />} />
          {/* <Route path="/anime" element={<AnimePage />} />
>>>>>>> 126ce8a5211f51340585dce1d4327711b06424cb
          <Route path="/fun" element={<FunPage />} /> */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
