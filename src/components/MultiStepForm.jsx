import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Stepper,
  Step,
  StepLabel,
  LinearProgress,
  Paper,
} from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Step1PersonalInfo from "./Step1PersonalInfo";
import Step2FamilyInfo from "./Step2FamilyInfo";
import Step3Situation from "./Step3Situation";
import useLocalStorage from "../hooks/useLocalStorage";
import LanguageSwitcher from "./LanguageSwitcher";

const personalFields = [
  {
    name: "name",
    type: "text",
    sm: 6,
    validation: (t) => ({ required: t("personalInfo.name") + " is required" }),
  },
  {
    name: "nationalId",
    type: "text",
    sm: 6,
    validation: (t) => ({
      required: t("personalInfo.nationalId") + " is required",
    }),
  },
  {
    name: "dob",
    type: "date",
    sm: 6,
    validation: (t) => ({ required: t("personalInfo.dob") + " is required" }),
  },
  {
    name: "gender",
    type: "text",
    sm: 6,
    validation: (t) => ({
      required: t("personalInfo.gender") + " is required",
    }),
  },
  {
    name: "address",
    type: "text",
    sm: 12,
    validation: (t) => ({
      required: t("personalInfo.address") + " is required",
    }),
  },
  { name: "country", type: "text", sm: 6 },
  { name: "state", type: "text", sm: 6 },

  { name: "city", type: "text", sm: 6 },
  { name: "phone", type: "text", sm: 6 },
  {
    name: "email",
    type: "email",
    sm: 12,
    validation: (t) => ({
      required: t("personalInfo.email") + " is required",
      pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
    }),
  },
];

const familyFields = [
  {
    name: "maritalStatus",
    type: "text",
    sm: 6,
    validation: (t) => ({
      required: t("familyInfo.maritalStatus") + " is required",
    }),
  },
  {
    name: "dependents",
    type: "number",
    sm: 6,
    validation: (t) => ({
      required: t("familyInfo.dependents") + " is required",
    }),
  },
  {
    name: "employmentStatus",
    type: "text",
    sm: 6,
    validation: (t) => ({
      required: t("familyInfo.employmentStatus") + " is required",
    }),
  },
  {
    name: "monthlyIncome",
    type: "number",
    sm: 6,
    validation: (t) => ({
      required: t("familyInfo.monthlyIncome") + " is required",
    }),
  },
  {
    name: "housingStatus",
    type: "text",
    sm: 12,
  },
];

const situationFields = [
  {
    name: "financialSituation",
    label: "Current Financial Situation",
    prompt: "Help me describe my current financial situation.",
  },
  {
    name: "employmentCircumstances",
    label: "Employment Circumstances",
    prompt: "Help me describe my employment circumstances.",
  },
  {
    name: "reasonForApplying",
    label: "Reason for Applying",
    prompt: "Help me describe my reason for applying for social support.",
  },
];

const MultiStepForm = ({ onSubmit }) => {
  const { t } = useTranslation();
  const steps = [t("steps.step1"), t("steps.step2"), t("steps.step3")];

  const methods = useForm({ mode: "onBlur" });
  const [activeStep, setActiveStep] = useState(0);
  const [storedData, setStoredData] = useLocalStorage("formData", {});

  // Load saved data into the form
  useEffect(() => {
    if (storedData) {
      methods.reset(storedData);
    }
  }, [storedData]);

  const handleNext = async () => {
    const isValid = await methods.trigger();
    if (isValid) {
      const data = methods.getValues();
      setStoredData({ ...storedData, ...data });
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleFinalSubmit = async (data) => {
    // Save final data and mock API submit
    setStoredData(data);
    await onSubmit(data);
    localStorage.removeItem("formData");
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <Step1PersonalInfo fields={personalFields} />;
      case 1:
        return <Step2FamilyInfo fields={familyFields} />;
      case 2:
        return <Step3Situation fields={situationFields} />;
      default:
        return null;
    }
  };

  return (
    <FormProvider {...methods}>
      <Paper
        elevation={3}
        sx={{
          p: 2,
          borderRadius: 4,
          bgcolor: "#fff",
          maxWidth: 800,
          margin: "auto",
          minHeight: "88vh",
          display: "flex",
          flexDirection: "column", // stack children vertically
            backgroundColor: "rgba(229, 208, 192, 0.9)", // White with 80% opacity
        }}
      >
        <LanguageSwitcher />

  <Stepper
  activeStep={activeStep}
  alternativeLabel
  connector={null}
  sx={{
    '& .MuiStepIcon-root.Mui-active': { color: '#e18814ff' },
    '& .MuiStepIcon-root.Mui-completed': { color: '#e18814ff' },
    '& .MuiStepLabel-label.Mui-active': { color: '#e18814ff', fontWeight: 'bold' },
  }}
>
  {steps.map((label) => (
    <Step key={label}>
      <StepLabel>{label}</StepLabel>
    </Step>
  ))}
</Stepper>

<LinearProgress
  variant="determinate"
  value={((activeStep + 1) / steps.length) * 100}
  sx={{
    my: 2,
    height: 4,
    borderRadius: 5,
    backgroundColor: '#f3e0c1', // light background
    '& .MuiLinearProgress-bar': {
      backgroundColor: '#e18814ff',
    },
  }}
/>


        {/* Step Content with scroll */}
        <Box
          sx={{
            flex: 1, // take remaining space
            overflowY: "auto", // enable vertical scroll
            paddingTop: 2,
            marginLeft: 2,
            marginRight: 2,
            // space for scrollbar
          }}
        >
          {renderStepContent(activeStep)}
        </Box>

        {/* Navigation Buttons fixed at bottom */}
        <Box
          display="flex"
          justifyContent="space-between"
          mt="auto"
          pt={2}
          borderTop={1}
          borderColor="divider"
        >
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
            sx={{ minWidth: 100, color: "#e18814ff", borderColor: "#e18814ff" }}
          >
            {t("buttons.back")}
          </Button>

          {activeStep < steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{ minWidth: 100 ,  backgroundColor: "#e18814ff",}}
            >
              {t("buttons.next")}
            </Button>
          ) : (
            <Button
              variant="contained"
              color="success"
              onClick={methods.handleSubmit(handleFinalSubmit)}
              sx={{ minWidth: 100,  backgroundColor: "#e18814ff",}}
            >
              {t("buttons.submit")}
            </Button>
          )}
        </Box>
      </Paper>
    </FormProvider>
  );
};

export default MultiStepForm;
