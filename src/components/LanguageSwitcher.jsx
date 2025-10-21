import React from "react";
import { Button, Box, FormControlLabel, styled, Switch } from "@mui/material";
import i18n from "../i18n";

const MaterialUISwitch = styled(Switch)(() => ({
  width: 80, // total width
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)", // initial (EN)
    transition: "all 0.3s ease",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(44px)", // move thumb to right for AR
      "& .MuiSwitch-thumb:before": {
        content: '"AR"', // show AR
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: "#e18814ff",
    width: 32,
    height: 32,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&::before": {
      content: '"EN"', // show EN initially
      color: "#fff",
      fontSize: "0.8rem",
      fontWeight: "bold",
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: "#aab4be",
    borderRadius: 20,
  },
}));



const LanguageSwitcher = () => {
  const currentLang = i18n.language || "en";

  const toggleLanguage = () => {    
    const newLang = currentLang === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);

    // Enable RTL for Arabic
    document.dir = newLang === "ar" ? "rtl" : "ltr";
  };

  return (
    <Box textAlign="right" p={1}>
      {/* <Button variant="outlined" onClick={toggleLanguage}>
        {currentLang === "en" ? "العربية" : "English"}
      </Button> */}
         <FormControlLabel
      control={
        <MaterialUISwitch
          checked={currentLang === "ar"}
          onChange={toggleLanguage}
        />
      }
     
    />
    </Box>
  );
};

export default LanguageSwitcher;
