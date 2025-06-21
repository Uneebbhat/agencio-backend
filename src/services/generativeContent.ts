import ai from "../config/geminiConfig";
import { GenerativeContentProps } from "../interfaces";

const generativeContent = async (prompt: GenerativeContentProps) => {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [{ role: "user", parts: [{ text: prompt.prompt }] }],
  });
  return response.text as string;
};

export default generativeContent;
