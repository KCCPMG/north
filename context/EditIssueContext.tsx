"use client";

import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";


type EditIssueContextTheme = {
  editMode: boolean,
  setEditMode: Dispatch<SetStateAction<boolean>>
}

const EditIssueContext = createContext<EditIssueContextTheme | null>(null);

export function EditIssueContextProvider({children}: {children: ReactNode}) {
  const [editMode, setEditMode] = useState(false);



  return (
    <EditIssueContext.Provider value={{
      editMode, setEditMode
    }}>
      {children}
    </EditIssueContext.Provider>
  )
}


export function useEditIssueContext() {
  const context = useContext(EditIssueContext);
  
  if (!context) {
    throw new Error("UseEditContext must be used in an EditIssueContextProvider")
  }
  
  return context;
}