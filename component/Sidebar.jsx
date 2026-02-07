"use client";

import Image from "next/image";
import { assets } from "@/assets/assets";
import { useClerk, UserButton } from "@clerk/nextjs";
import { useAppContext } from "@/context/AppContext";
import ChatLabel from './ChatLabel'
import { useState } from "react";

const Sidebar = ({ expand, setExpand }) => {
  const { openSignIn } = useClerk();
  const { user } = useAppContext();
  const [ openMenu, setOpenMenu ] = useState({id: 0, open:false})

  return (
    <div
      className={`flex flex-col justify-between bg-[#212327] pt-7
      transition-all duration-300 z-50
      max-md:absolute max-md:h-screen overflow-visible
      ${expand ? "p-4 w-64" : "w-20"}`}
    >
      {/* ================= TOP ================= */}
      <div>
        <div
          className={`flex ${
            expand ? "flex-row gap-10" : "flex-col items-center gap-8"
          }`}
        >
          {/* LOGO */}
          <Image
            src={expand ? assets.logo_text : assets.logo_icon}
            alt="Logo"
            width={expand ? 140 : 40}
            height={40}
            className="cursor-pointer"
          />

          {/* TOGGLE BUTTON */}
          <div
            onClick={() => setExpand(!expand)}
            className="group relative flex items-center justify-center h-9 w-9
            rounded-lg cursor-pointer hover:bg-gray-500/20 transition"
          >
            <Image
              src={expand ? assets.sidebar_close_icon : assets.sidebar_icon}
              alt="Toggle"
              width={24}
              height={24}
            />

            {/* TOOLTIP */}
            <div
              className={`absolute whitespace-nowrap
              ${
                expand
                  ? "top-12 left-1/2 -translate-x-1/2"
                  : "-top-12 left-1/2 -translate-x-1/2"
              }
              opacity-0 group-hover:opacity-100 transition
              bg-black text-white text-xs px-3 py-1.5 rounded-md`}
            >
              {expand ? "Close sidebar" : "Open sidebar"}
            </div>
          </div>
        </div>

        {/* NEW CHAT */}
        <button
          className={`mt-8 flex items-center justify-center transition
          ${
            expand
              ? "bg-primary rounded-2xl gap-2 p-2.5 w-max"
              : "group relative h-9 mx-auto hover:bg-gray-500/30 rounded-lg"
          }`}
        >
          <Image
            src={expand ? assets.chat_icon : assets.chat_icon_dull}
            alt="Chat"
            width={24}
            height={24}
          />
          {expand && <p className="text-white">New chat</p>}
        </button>
        <div className = {`mt-8 text-white/25 text-sm text-sm ${expand ? "block":"hidden"}`}>
          <p className ='my-1'>Recents</p>
          <ChatLabel openMenu={openMenu } setOpenMenu={setOpenMenu}/>
        </div>
      </div>

      {/* ================= BOTTOM ================= */}
      <div className="relative">
        {/* GET APP */}
        <div
          className={`group flex items-center cursor-pointer transition
          ${
            expand
              ? "gap-2 text-white/80 text-sm p-2.5 border border-primary rounded-lg hover:bg-white/10"
              : "h-10 w-10 mx-auto hover:bg-gray-500/30 rounded-lg justify-center"
          }`}
        >
          <Image
            src={expand ? assets.phone_icon : assets.phone_icon_dull}
            alt="App"
            width={24}
            height={24}
          />

          {/* QR SCANNER */}
          <div
            className={`fixed bottom-24 transition-all z-[9999]
            ${expand ? "left-64" : "left-20"}
            opacity-0 group-hover:opacity-100`}
          >
            <div className="bg-black text-white text-sm p-3 rounded-lg shadow-lg">
              <Image
                src={assets.qrcode}
                alt="QR"
                width={176}
                height={176}
              />
              <p className="mt-2 text-center">Scan to get App</p>
            </div>
          </div>

          {expand && (
            <>
              <span>Get App</span>
              <Image src={assets.new_icon} alt="New" width={20} height={20} />
            </>
          )}
        </div>

        {/* PROFILE */}
        <div
          onClick={user ? null : openSignIn}
          className={`flex items-center gap-3 text-white/60 text-sm p-2 mt-2 cursor-pointer
          ${expand ? "hover:bg-white/10 rounded-lg" : "justify-center w-full"}`}
        >
          {user ? (
            <UserButton />
          ) : (
            <Image
              src={assets.profile_icon}
              alt="Profile"
              width={28}
              height={28}
            />
          )}

          {expand && <span>My Profile</span>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
