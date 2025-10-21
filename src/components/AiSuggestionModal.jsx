import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";

const AiSuggestionModal = ({ open, onClose, onAccept, prompt }) => {
 const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
  const [loading, setLoading] = useState(false);
  const [editableText, setEditableText] = useState("");
  const [error, setError] = useState("");

  // Fetch AI suggestion when modal opens
  useEffect(() => {
    if (!open || !prompt) return;

    const fetchSuggestion = async () => {
      setLoading(true);
      setError("");
      setEditableText("");

      try {
        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
            max_tokens: 400,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${OPENAI_API_KEY}`,
            },
          }
        );

        const text = response.data.choices?.[0]?.message?.content?.trim() || "";
        setEditableText(text);
      } catch (err) {
        console.error("AI suggestion error:", err);
        setError(
          err.response?.status === 429
            ? "⚠️ Too many requests. Try again in a few seconds."
            : "⚠️ Failed to generate suggestion. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestion();
  }, [open, prompt]);

  const handleAccept = () => {
    if (editableText) onAccept(editableText);
    onClose();
  };

  const handleDiscard = () => onClose();

  const handleRegenerate = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
          max_tokens: 400,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );
      const text = response.data.choices?.[0]?.message?.content?.trim() || "";
      setEditableText(text);
    } catch (err) {
      console.error("Regenerate error:", err);
      setError("⚠️ Unable to regenerate text. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleDiscard} fullWidth maxWidth="sm">
      <DialogTitle>AI Suggestion</DialogTitle>

      <DialogContent dividers>
        {loading ? (
          <Box display="flex" justifyContent="center" p={4}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" textAlign="center">
            {error}
          </Typography>
        ) : (
          <TextField
            fullWidth
            multiline
            minRows={5}
            value={editableText}
            onChange={(e) => setEditableText(e.target.value)}
            variant="outlined"
            inputProps={{ "aria-label": "AI generated suggestion" }}
          />
        )}
      </DialogContent>

      <DialogActions sx={{ justifyContent: "space-between", px: 3 }}>
        <Button onClick={handleDiscard} color="inherit">
          Discard
        </Button>

        <Box display="flex" gap={1}>
          <Button
            onClick={handleRegenerate}
            color="secondary"
            disabled={loading}
          >
            Regenerate
          </Button>
          <Button
            onClick={handleAccept}
            variant="contained"
            color="primary"
            disabled={!editableText || loading}
          >
            Accept
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default AiSuggestionModal;
