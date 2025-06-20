import { Message } from "@/components/Layout/Main";
import { Info } from "@/components/ui/bussinesInfo";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Dispatch, SetStateAction } from "react";

export interface HistoryMessages {
  history: {
    role: "model" | "user";
    parts: { text: string }[];
  }[];
}

const apiKey = String(process.env.NEXT_PUBLIC_API);
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: Info,
});

const messages: HistoryMessages = {
  history: [],
};
export async function sendPrompt(
  prompt: string,
  setMessage: Dispatch<SetStateAction<Message[]>>,
  setError: Dispatch<SetStateAction<string>>,
  setIsLoading: Dispatch<SetStateAction<boolean>>
) {
  try {
    setError("");
    const chatSession = model.startChat(messages);
    setIsLoading(true);
    const result = await chatSession.sendMessageStream(prompt);
    // const res = result.response.text();
    let fullText = "";
    setMessage((prev) => [...prev, { text: "", sender: "bot" }]);
    for await (const chunk of result.stream) {
      const chunkText = await chunk.text();
      fullText += chunkText;
      setMessage((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { text: fullText, sender: "bot" };
        return updated;
      });
      setIsLoading(false);
      messages.history.push(
        {
          role: "user",
          parts: [{ text: prompt }],
        },
        {
          role: "model",
          parts: [{ text: chunkText }],
        }
      );
    }
  } catch (error: any) {
    setError(`Message not sent try again!`);
    console.log(`${error?.message} `);
  } finally {
    setIsLoading(false);
  }
}
