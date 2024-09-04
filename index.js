// import { Configuration, OpenAIApi } from "openai";
import OpenAI from "openai";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";


// const configuration = new Configuration({
//     organization: "org-4AAfn1YDnUqmEcRXtKvUsKiF",
//     apiKey: "sk-sDqQ4HMU8XQjiSNPZe_7N6rWzwG-7qtrxtfkCencBmT3BlbkFJe3hI33VYODMJMYPlbtKj6PbId-6zO78z_-bidZe1kA",
// });

const openai = new OpenAI();

// const openai = new OpenAIApi(configuration);

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