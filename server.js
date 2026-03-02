const express = require("express");
const path = require("path");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// AI route
app.post("/api/chat", async (req, res) => {
  try {
    const message = req.body.message;

  
  console.log("api",process.env.GROQ_API_KEY)
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-8b-8192",
        messages: [{ role: "user", content: message }]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );
  
      console.log("response",response)
     
    res.json({
      reply: response.data.choices[0].message.content
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ reply: "Error from AI server" });
  }
});

// Start server LAST
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
