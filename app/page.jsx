// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import Sidebar from "../component/Sidebar";
// import { assets } from "../assets/assets";
// import  PromptBox from "../component/PromptBox";

// export default function Home() {
//   const [expand, setExpand] = useState(false);
//   const [messages] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   return (
//     <div className="flex h-screen bg-[#292a2d] text-white">
//       {/* Sidebar */}
//       <Sidebar expand={expand} setExpand={setExpand} />

//       {/* Main Area */}
//       <div className="flex-1 flex flex-col items-center justify-center px-4 pb-8 relative">
//         {/* Mobile Header */}
//         <div className="md:hidden absolute top-6 left-0 px-4 flex items-center justify-between w-full">
//           <Image
//             src={assets.menu_icon}
//             alt="menu"
//             width={24}
//             height={24}
//             onClick={() => setExpand(!expand)}
//             className="rotate-180 cursor-pointer"
//           />
//           <Image
//             src={assets.chat_icon}
//             alt="chat"
//             width={24}
//             height={24}
//             className="opacity-70"
//           />
//         </div>

//         {/* Empty Chat State */}
//         {messages.length === 0 ? (
//           <div className="flex flex-col items-center text-center">
//             <div className="flex items-center gap-3">
//               <Image
//                 src={assets.logo_icon}
//                 alt="DeepSeek Logo"
//                 width={64}
//                 height={64}
//               />
//               <p className="text-2xl font-medium">Hi, I am DeepSeek.</p>
//             </div>
//             <p className="text-sm mt-2 opacity-70">
//               How can I help you today?
//             </p>
//           </div>
//         ):
//         (
//           <div></div>
//         )
//       }
//       {/* prompt box */}
//       <PromptBox isLoading = {isLoading} setIsLoading={setIsLoading}/>
//       <p className = "text-xs absolute bottom-1 text-gray-500">AI-generated,
//         for reference only</p>
//       </div>
//     </div>
//   );
// }


// // "use client";

// // import Image from "next/image";
// // import { assets } from "@/assets/assets";

// // export default function Sidebar({ expand, setExpand }) {
// //   return (
// //     <div
// //       className={`h-screen bg-[#202123] transition-all duration-300 ${
// //         expand ? "w-64" : "w-16"
// //       } hidden md:flex flex-col`}
// //     >
// //       {/* Top */}
// //       <div className="flex items-center justify-between p-4">
// //         <Image
// //           src={assets.sidebar_icon}
// //           alt="open"
// //           width={24}
// //           height={24}
// //           className="cursor-pointer"
// //           onClick={() => setExpand(!expand)}
// //         />
// //         {expand && (
// //           <Image
// //             src={assets.sidebar_close_icon}
// //             alt="close"
// //             width={20}
// //             height={20}
// //             className="cursor-pointer"
// //             onClick={() => setExpand(false)}
// //           />
// //         )}
// //       </div>

// //       {/* Content */}
// //       {expand && (
// //         <div className="px-4 text-sm opacity-70">
// //           <p>New Chat</p>
// //           <p className="mt-2">History</p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }



// // "use client";

// // import { useState } from "react";
// // import Sidebar from "../component/Sidebar";
// // import { assets } from "@/assets/assets";

// // export default function Page() {
// //   const [expand, setExpand] = useState(true);

// //   return (
// //     <div className="flex min-h-screen bg-black">
// //       <Sidebar expand={expand} setExpand={setExpand} />
// //       <div className="flex-1 text-white p-6">
// //         PAGE WORKING
// //       </div>
// //     </div>
// //   );
// // }


"use client";

import { useState } from "react";
import Image from "next/image";
import Sidebar from "@/component/Sidebar";
import PromptBox from "@/component/PromptBox";
import { assets } from "@/assets/assets";
import Message from '@/component/Message'

export default function Home() {
  const [expand, setExpand] = useState(false);
  const [messages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex h-screen bg-[#292a2d] text-white">
      <Sidebar expand={expand} setExpand={setExpand} />

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
          <div>
            <Message role = 'user' content ='What is next js'/>
          </div>
  
        )}

        <PromptBox isLoading={isLoading} setIsLoading={setIsLoading} />
        <p className="text-xs absolute bottom-1 text-gray-500">
          AI-generated, for reference only
        </p>
      </div>
    </div>
  );
}
