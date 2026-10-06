const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
  res.send("NOVA AI Backend is running!");
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "Message is required"
      });
    }

    const response = await client.responses.create({
      model: "gpt-5",
      instructions:
        "You are NOVA, a friendly AI assistant inside an XO game. " +
        "Answer naturally and helpfully. " +
        "If the user speaks Arabic, answer in Arabic. " +
        "If the user speaks English, answer in English.",
      input: message
    });

    res.json({
      reply: response.output_text
    });

  } catch (error) {
    console.error("NOVA ERROR:", error);

    res.status(500).json({
      error: error.message || "Something went wrong"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`NOVA server running on port ${PORT}`);
});
