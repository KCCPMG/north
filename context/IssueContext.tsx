"use client";

import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";


type IssueContext = {
  editMode: boolean,
  setEditMode: Dispatch<SetStateAction<boolean>>
}

const IssueContext = createContext<IssueContext | null>(null);

export function IssueContextProvider({children}: {children: ReactNode}) {
  const [editMode, setEditMode] = useState(false);



  return (
    <IssueContext.Provider value={{
      editMode, setEditMode
    }}>
      {children}
    </IssueContext.Provider>
  )
}


export function useIssueContext() {
  const context = useContext(IssueContext);
  
  if (!context) {
    throw new Error("UseIssueContext must be used in a UseIssueContextProvider")
  }
  
  return context;
}