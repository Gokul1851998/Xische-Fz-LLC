import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Grid, TextField } from "@mui/material";
import { useEffect } from "react";

const Step2FamilyInfo = ({ fields }) => {
  const {
    register,
    formState: { errors },
    clearErrors, // ⬅️ imported from useFormContext
  } = useFormContext();

  const { t, i18n } = useTranslation();

  // 🟢 Clear validation errors whenever language changes
  useEffect(() => {
    clearErrors();
  }, [i18n.language, clearErrors]);

  return (
    <Grid container spacing={2}>
      {fields.map((field) => (
        <Grid key={field.name} item xs={12} sm={field.sm || 6}>
          <TextField
            fullWidth
            size="small"
            type={field.type || "text"}
            label={t(`familyInfo.${field.name}`)}
            {...register(field.name, field.validation?.(t))}
            error={!!errors[field.name]}
            helperText={errors[field.name]?.message}
            sx={{
              "& .MuiInputBase-input": {
                fontSize: field.inputFontSize || "0.85rem",
              },
              "& .MuiInputLabel-root": {
                fontSize: field.labelFontSize || "0.85rem",
              },
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Step2FamilyInfo;
