import axios from "axios";

export async function generateSuggestion(prompt, apiKey) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        timeout: 15000,
      }
    );
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error(error);
    throw new Error("AI Assistance failed. Please try again.");
  }
}
