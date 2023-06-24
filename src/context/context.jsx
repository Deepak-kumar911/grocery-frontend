import React, { useState,} from 'react'
import { createContext,useContext } from 'react';

const AppContext = createContext();
export function AppWrapper({children}){
    const [toggle,setToggle] = useState(false);
  return (
   <AppContext.Provider value={{toggle,setToggle}}>
      {children}
   </AppContext.Provider>
  )
}


export function useAppContext(){
  return useContext(AppContext);
}
