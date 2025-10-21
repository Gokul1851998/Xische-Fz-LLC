import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useTranslation } from "react-i18next";

const SuccessPage = ({ onRestart }) => {
  const { t, i18n } = useTranslation();

  const isRTL = i18n.language === "ar";

  return (
    <Box
      sx={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f9fafb",
        direction: isRTL ? "rtl" : "ltr",
        borderRadius:2,
         backgroundColor: "rgba(255, 255, 255, 0)",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 5,
          maxWidth: 500,
          textAlign: "center",
          borderRadius: 4,
           backgroundColor: "rgba(229, 208, 192, 0.9)",
        }}
      >
        <CheckCircleOutlineIcon
          sx={{
            fontSize: 80,
            color: "success.main",
            mb: 2
          }}
        />

        <Typography variant="h5" gutterBottom fontWeight="bold">
          {t("success.title")}
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          {t("success.message")}
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={onRestart}
          sx={{ borderRadius: 2 ,  backgroundColor: "#e18814ff",}}
        >
          {i18n.language === "ar" ? "بدء طلب جديد" : "Start New Application"}
        </Button>
      </Paper>
    </Box>
  );
};

export default SuccessPage;
