import React, { useState } from "react";
import MultiStepForm from "../components/MultiStepForm";
import SuccessPage from "./SuccessPage";
import LanguageSwitcher from "../components/LanguageSwitcher";

const ApplicationForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    // Mock API
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmitted(true);
  };

  const handleRestart = () => {
    setSubmitted(false);
    localStorage.removeItem("formData");
  };

  return (
    <>
      {/* Always visible at the top of the form */}
      {/* <LanguageSwitcher /> */}
      {submitted ? (
        <SuccessPage onRestart={handleRestart} />
      ) : (
        <MultiStepForm onSubmit={handleSubmit} />
      )}
    </>
  );
};

export default ApplicationForm;
