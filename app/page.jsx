"use client";

import { useState } from "react";
import Image from "next/image";
import Sidebar from "@/component/Sidebar";
import PromptBox from "@/component/PromptBox";
import Message from "@/component/Message";
import { assets } from "@/assets/assets";

export default function Home() {

const [expand, setExpand] = useState(false);
const [messages, setMessages] = useState([]);
const [isLoading, setIsLoading] = useState(false);

// Function to send message
const sendMessage = (text) => {
  if (!text.trim()) return; 
  const newMessage = { role: "user", content: text
};
setMessages([...messages, newMessage]);

};

return ( <div className="flex h-screen bg-[#292a2d] text-white">

```
  {/* Sidebar */}
  <Sidebar expand={expand} setExpand={setExpand} />

  {/* Main Chat Area */}
  <div className="flex-1 flex flex-col items-center justify-center px-4 pb-8 relative">

    {/* Mobile Header */}
    <div className="md:hidden absolute top-6 left-0 px-4 flex items-center justify-between w-full">
      <Image
        src={assets.menu_icon}
        alt="menu"
        width={24}
        height={24}
        onClick={() => setExpand(!expand)}
        className="cursor-pointer"
      />

      <Image
        src={assets.chat_icon}
        alt="chat"
        width={24}
        height={24}
        className="opacity-70"
      />
    </div>

    {/* Welcome Screen */}
    {messages.length === 0 ? (
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center gap-3">
          <Image src={assets.logo_icon} alt="logo" width={64} height={64} />
          <p className="text-2xl font-medium">Hi, I am DeepSeek.</p>
        </div>

        <p className="text-sm mt-2 opacity-70">
          How can I help you today?
        </p>
      </div>
    ) : (

      /* Chat Messages */
      <div className="w-full max-w-3xl flex flex-col gap-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <Message
            key={index}
            role={msg.role}
            content={msg.content}
          />
        ))}
      </div>

    )}

    {/* Prompt Box */}
    <PromptBox
      sendMessage={sendMessage}
      isLoading={isLoading}
      setIsLoading={setIsLoading}
    />

    <p className="text-xs absolute bottom-1 text-gray-500">
      AI-generated, for reference only
    </p>

  </div>
</div>
);
}
