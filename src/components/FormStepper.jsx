import React from "react";
import {
  Stepper,
  Step,
  StepLabel,
  useMediaQuery,
  Box,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

/**
 * Props:
 *  - steps: string[] (array of step titles)
 *  - activeStep: number (current step index)
 */
const FormStepper = ({ steps, activeStep }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        width: "100%",
        py: 3,
        px: { xs: 2, sm: 4 },
        backgroundColor: theme.palette.background.paper,
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <Typography
        variant="h6"
        textAlign="center"
        sx={{ mb: 2, fontWeight: 600 }}
      >
        Application Progress
      </Typography>

      <Stepper
        activeStep={activeStep}
        alternativeLabel={!isMobile}
        orientation={isMobile ? "vertical" : "horizontal"}
        sx={{
          "& .MuiStepLabel-label": {
            fontSize: isMobile ? "0.85rem" : "1rem",
          },
        }}
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: activeStep === index ? 600 : 400,
                  color:
                    activeStep === index
                      ? theme.palette.primary.main
                      : "inherit",
                }}
              >
                {label}
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default FormStepper;
