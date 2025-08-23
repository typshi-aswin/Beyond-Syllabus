import { genkit } from "genkit";
import { googleAI } from "@genkit-ai/googleai";

export const Chat = genkit({
  plugins: [googleAI()],
  model: "googleai/gemini-2.0-flash",
});
