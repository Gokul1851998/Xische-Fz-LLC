import React from "react";
import {
  CssBaseline,
  Container,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import ApplicationForm from "./pages/ApplicationForm";
import LanguageSwitcher from "./components/LanguageSwitcher";
import "./i18n"; // Ensure i18n is initialized
import uaeImage from "./assets/uae.jpg"; // Make sure the path is correct

const App = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const theme = createTheme({
    direction: isRTL ? "rtl" : "ltr",
    typography: {
      fontFamily: isRTL ? "Tajawal, sans-serif" : "Roboto, sans-serif",
    },
  });

  document.body.dir = isRTL ? "rtl" : "ltr";

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Full-screen background image */}
      <div
        style={{
          width: "100vw",
          height: "100vh",
          position: "fixed",
          m:0,
          top: 0,
          left: 0,
          zIndex: -1,
          backgroundImage: `url(${uaeImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Content */}
      <Container
        maxWidth="md"
        sx={{
          py: 5,
        }}
      >
      
        <ApplicationForm />
      </Container>
    </ThemeProvider>
  );
};

export default App;
