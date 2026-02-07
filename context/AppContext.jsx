// "use client"

// import { useUser } from "@clerk/nextjs";
// //import { userAgent } from "next/server";
// import { createContext, useContext } from "react";

// export const AppContext = createContext();
// export const useAppContent = ()=>{
//     return useContext(AppContext)
// }

// export const AppContextProvider = ({children})=>{
//     const{ user } = useUser()

//     const value = {
//         user
//     };
//     return (
//     <AppContext.Provider value={value}>
//         {children}
//     </AppContext.Provider>
//     );
// };


"use client";

import { createContext, useContext } from "react";
import { useUser } from "@clerk/nextjs";

export const AppContext = createContext(null);

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppContextProvider = ({ children }) => {
  const { user } = useUser();

  return (
    <AppContext.Provider value={{ user }}>
      {children}
    </AppContext.Provider>
  );
};
