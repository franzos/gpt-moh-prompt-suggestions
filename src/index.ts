import express from "express";
import { Configuration, OpenAIApi } from "openai";
import { AxiosError } from "axios";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import { Inroduction } from "./introduction";

dotenv.config();

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY environment variable is not set.");
}

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const intro = new Inroduction("./introduction.json");
const openai = new OpenAIApi(configuration);

const app = express();
const port = Number(process.env.PORT) || 5000;
const host = process.env.HOST || "127.0.0.1";

app.use(cors());
app.use(bodyParser.json());

app.post("/api/suggest", async (req, res) => {
  const { prompt } = req.body;

  const introduction = intro.substitute(req.body);

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        ...introduction,
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const result = response.data.choices[0].message?.content;
    res.json({ result });
  } catch (err) {
    const error = err as AxiosError;
    const errorText = error.response?.statusText;
    console.error(`ERROR: ${errorText}`);
    res.status(500).json({ error: errorText });
  }
});

app.use(express.static(path.join(__dirname, "../client/dist")));

app.listen(port, host, () => {
  console.log(`Server is listening on ${host}:${port}`);
});
