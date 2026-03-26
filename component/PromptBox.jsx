"use client";

import { assets } from "@/assets/assets";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAppContext } from "@/context/AppContext";

export default function PromptBox({ isLoading }) {

  const [prompt, setPrompt] = useState("");

  const { user, setChats, selectedChat, setSelectedChat } = useAppContext();

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendPrompt(e);
    }
  };

  const sendPrompt = async (e) => {
    const promptCopy = prompt;

    try {
      e.preventDefault();

      if (!user) return toast.error("Login to send message");
      if (isLoading) return toast.error("Wait for previous response");

      setPrompt("");

      const userPrompt = {
        role: "user",
        content: prompt,
        timestamp: Date.now(),
      };

      // update chats list
      setChats((prev) =>
        prev.map((chat) =>
          chat._id === selectedChat._id
            ? {
                ...chat,
                messages: [...chat.messages, userPrompt],
              }
            : chat
        )
      );

      // update selected chat
      setSelectedChat((prev) => ({
        ...prev,
        messages: [...prev.messages, userPrompt],
      }));

      const { data } = await axios.post("/api/chat/ai", {
        chatId: selectedChat._id,
        prompt,
      });

      if (data.success) {
        const message = data.data.content;

        const assistantMessage = {
          role: "assistant",
          content: message,
          timestamp: Date.now(),
        };

        setSelectedChat((prev) => ({
          ...prev,
          messages: [...prev.messages, assistantMessage],
        }));

      } else {
        toast.error(data.message);
        setPrompt(promptCopy);
      }

    } catch (error) {
      toast.error(error.message);
      setPrompt(promptCopy);
    }
  };

  return (
    <form
      onSubmit={sendPrompt}
      className="w-full max-w-2xl bg-[#404045] p-4 rounded-3xl mt-4"
    >

      <textarea
        onKeyDown={handleKeyDown}
        className="outline-none w-full resize-none overflow-hidden break-words bg-transparent"
        rows={2}
        placeholder="Message DeepSeek"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <div className="flex items-center justify-between text-sm mt-2">

        <div className="flex items-center gap-2">

          <p className="flex items-center gap-2 text-xs border border-gray-300/40 px-2 py-1 rounded-full cursor-pointer hover:bg-gray-500/20">
            <Image src={assets.deepthink_icon} alt="deepthink" width={20} height={20} />
            DeepThink(R1)
          </p>

          <p className="flex items-center gap-2 text-xs border border-gray-300/40 px-2 py-1 rounded-full cursor-pointer hover:bg-gray-500/20">
            <Image src={assets.search_icon} alt="search" width={20} height={20} />
            Search
          </p>

        </div>

        <div className="flex items-center gap-2">

          <Image
            src={assets.pin_icon}
            alt="pin"
            width={16}
            height={16}
            className="cursor-pointer"
          />

          <button
            type="submit"
            disabled={isLoading}
            className={`rounded-full p-2 ${prompt ? "bg-blue-500" : "bg-gray-500"}`}
          >
            <Image
              src={prompt ? assets.arrow_icon : assets.arrow_icon_dull}
              alt="send"
              width={14}
              height={14}
            />
          </button>

        </div>

      </div>
    </form>
  );
}