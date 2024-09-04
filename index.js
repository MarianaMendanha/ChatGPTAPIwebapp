// import { Configuration, OpenAIApi } from "openai";
import OpenAI from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const openai = new OpenAI();

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res) => {
    const { messages } = req.body;

    console.log(messages);
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { "role": "system", "content": "You are DesignGPT helpful assistant graphics design chatbot." },
                ...messages
            ]
        });

        res.json({
            completion: completion.choices[0].message
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
