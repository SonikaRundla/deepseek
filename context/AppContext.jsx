"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useUser, useAuth } from "@clerk/nextjs";
import axios from "axios";
import toast from "react-hot-toast";

export const AppContext = createContext(null);

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {

  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();

  const [chats, setChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  // Create new chat
  const createNewChat = async () => {
    try {

      if (!user) return;

      const token = await getToken();
      if (!token) return;

      await axios.post(
        "/api/chat/create",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchUserChats();

    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  // Fetch chats
  const fetchUserChats = async () => {
    try {

      if (!user) return;

      const token = await getToken();
      if (!token) return;

      const { data } = await axios.get("/api/chat/get", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!data.success) {
        return toast.error(data.message);
      }

      let chatsData = data.data || [];

      // If user has no chats → create one
      if (chatsData.length === 0) {
        await createNewChat();
        return;
      }

      // Sort chats by last update
      chatsData.sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );

      setChats(chatsData);
      setSelectedChat(chatsData[0]);

    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  // Load chats when user loads
  useEffect(() => {
    if (!isLoaded) return;

    if (user) {
      fetchUserChats();
    }

  }, );

  const value = {
    user,
    chats,
    setChats,
    selectedChat,
    setSelectedChat,
    fetchUserChats,
    createNewChat,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};