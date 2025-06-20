import { GoogleGenAI } from "@google/genai";
import { GEM_API_KEY } from "../config/constants";

const ai = new GoogleGenAI({
  apiKey: GEM_API_KEY,
});

export default ai;
