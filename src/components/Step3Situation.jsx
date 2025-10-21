import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Stack } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import AiSuggestionModal from "./AiSuggestionModal";

const Step3Situation = ({ fields }) => {
  const { control, setValue, clearErrors } = useFormContext();
  const { t, i18n } = useTranslation();
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [currentField, setCurrentField] = useState("");

  // 🟢 Clear any errors when language changes (for consistency)
  useEffect(() => {
    clearErrors();
  }, [i18n.language, clearErrors]);

  // Open AI modal for a specific field
  const handleOpenAiModal = (fieldName) => {
    const field = fields.find((f) => f.name === fieldName);
    if (!field?.prompt) return;

    setCurrentPrompt(field.prompt);
    setCurrentField(fieldName);
    setModalOpen(true);
  };

  // Accept suggestion from AI modal
  const handleAcceptSuggestion = (text) => {
    setValue(currentField, text); // update React Hook Form
    setModalOpen(false);
  };

  return (
    <Stack spacing={2}>
      {fields.map((field) => (
        <Box key={field.name}>
          <Controller
            name={field.name}
            control={control}
            defaultValue=""
            render={({ field: controllerField }) => (
              <TextField
                {...controllerField}
                fullWidth
                multiline
                maxRows={2}
                label={t(`situationInfo.${field.name}`, field.label)} // 🟢 translated label
                sx={{
                  "& .MuiInputBase-input": {
                    fontSize: field.inputFontSize || "0.85rem",
                  },
                  "& .MuiInputLabel-root": {
                    fontSize: field.labelFontSize || "0.85rem",
                  },
                }}
              />
            )}
          />
          {field.prompt && (
            <Button
              size="small"
              sx={{ mt: 1, color: "#e18814ff", borderColor: "#e18814ff" }}
              variant="outlined"
              onClick={() => handleOpenAiModal(field.name)}
            >
              {t("buttons.helpMeWrite", "Help Me Write ✨")}
            </Button>
          )}
        </Box>
      ))}

      <AiSuggestionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAccept={handleAcceptSuggestion}
        prompt={currentPrompt}
      />
    </Stack>
  );
};

export default Step3Situation;
