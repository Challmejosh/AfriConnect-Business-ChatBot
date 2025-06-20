import { Message } from "../Layout/Main";
import { AnimatePresence, motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

interface Prop {
  message: Message[];
  error: string;
  loading: boolean;
}

const ChatBox = ({ message, error, loading }: Prop) => {
  return (
    <div className="h-full py-5 p-2 w-full flex flex-col gap-2 overflow-y-auto [&::-webkit-scrollbar]:hidden scrollbar bg-transparent ">
      {message?.map((msg, index) => (
        <motion.div
          initial={{ opacity: 0, origin: 1, scale: 0, y: 80 }}
          animate={{ opacity: 1, origin: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: index * 0.2,
          }}
          key={index}
          className={`${msg.sender === "bot" && "bg-gray-200 self-start"} ${
            msg.sender === "user" && "bg-[blue] text-white self-end"
          } max-w-[85%] sm:max-w-[70%] cursor-pointer px-3 sm:px-4 py-2 rounded-[20px] text-sm sm:text-base `}
        >
          {msg.sender === "user" ? (
            <>
              <p className="break-words">{msg.text}</p>
            </>
          ) : (
            <>
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            </>
          )}
        </motion.div>
      ))}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0, y: 80 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 80 }}
            transition={{ duration: 0.5 }}
            className="self-start max-w-[85%] w-fit sm:max-w-[70%] cursor-pointer px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base flex items-center"
          >
            <div className="loader"></div>
          </motion.div>
        )}
        {error && (
          <motion.p
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.5 * 0.2,
            }}
            className="text-center w-full text-red-600 "
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBox;
