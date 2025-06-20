"use client";
import { useState } from "react";
import SendForm from "../ui/SendForm";
import ChatBox from "../ui/chatbox";
import { Send, X } from "lucide-react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { sendPrompt } from "../../libs/Gemini";

export type Message = {
  sender: "user" | "bot";
  text: string;
};

const Main = () => {
  const [message, setMessage] = useState<Message[]>([
    { sender: "bot", text: "How can I help you today ?." },
  ]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const [error, setError] = useState<string>("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  const sendToAI = (e: React.FormEvent<HTMLFormElement>, input: string) => {
    e.preventDefault();
    if (input.trim()) {
      setInput("");
      setMessage([...message, { sender: "user", text: input }]);
      sendPrompt(input, setMessage, setError, setIsLoading);
    }
  };
  return (
    <div className="w-full h-full ">
      {/* open chat dialogue */}
      <AnimatePresence>
        {!isOpen && (
          <motion.p
            key="chat-open"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            onClick={() => setIsOpen(true)}
            className="text-white flex items-center justify-center rounded-full bg-black hover:shadow-2xl shadow-lg w-[80px] h-[80px] cursor-pointer absolute bottom-8 right-8 "
          >
            <Image
              src={"/chat-icon.png"}
              alt="chatIcon"
              className=""
              width={30}
              height={30}
            />
          </motion.p>
        )}
      </AnimatePresence>
      {/* chat dialogue box */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.1, x: 70, y: 200 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.1, x: 70, y: 200 }}
            transition={{
              duration: 0.3,
              delay: 0.2,
              staggerChildren: 3,
            }}
            className="absolute bottom-8 right-8 z-20 flex flex-col items-start justify-between shadow-2xl h-[500px] rounded-[20px] w-[75%] sm:w-[400px] max-h-[600px]  "
          >
            <div
              onClick={() => setIsOpen(false)}
              className="w-full bg-black cursor-pointer rounded-t-[20px] p-3 text-white flex gap-2 items-center justify-center "
            >
              <X size={18} />
              <p className="">close</p>
            </div>
            {/* chatbox */}

            <ChatBox loading={isLoading} error={error} message={message} />

            {/* chat sendForm */}
            <SendForm
              handleSubmit={sendToAI}
              value={input}
              type={"text"}
              onChange={handleChange}
              title={"Ask me anything..."}
              placeholder={"Ask me anything..."}
              btnValue={<Send fill="blue" />}
              btnType={"submit"}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Main;
