const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();
const port = 8081;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/api", async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await openai.images.generate({
      prompt,
      n: 1,
      size: "1024x1024",
    });
    if (response.data && response.data.length > 0 ) {
      const imageUrl = response.data[0].url;
      res.status(200).json({ photo: imageUrl });
    } else {
      // Handle case where response data array is empty
      res.status(500).json({ error: "Response data array is empty" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while generating the image" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
