import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";

// import NavBar from "./components/NavBar";
// import HomePage from "./pages/HomePage";
// import "./App.css";
import LoginPage from "./pages/Login";
import NavBar from "./components/NavBar";
// import RegisterPage from "./pages/Register";
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
          {/* <Route path="/home" element={<HomePage />} /> */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login/:username/:password" element={<LoginPage />} />
          {/* <Route
            path="/register/:username/:password/:gender/:age"
            element={<RegisterPage />}
          />
          <Route path="/anime" element={<AnimePage />} />
          <Route path="/fun" element={<FunPage />} /> */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
