"use client";

import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";
import { ParsedPopulatedIssueType } from "@/models/Controls";


type IssueContext = {
  editMode: boolean,
  setEditMode: Dispatch<SetStateAction<boolean>>,
  issue: ParsedPopulatedIssueType,
  setIssue: Dispatch<SetStateAction<ParsedPopulatedIssueType>>
}

const IssueContext = createContext<IssueContext | null>(null);

type IssueContextProviderProps = {
  children: ReactNode,
  initialIssue: ParsedPopulatedIssueType
}

export function IssueContextProvider({children, initialIssue}: IssueContextProviderProps) {
  const [editMode, setEditMode] = useState(false);
  const [issue, setIssue] = useState(initialIssue)



  return (
    <IssueContext.Provider value={{
      editMode, setEditMode, issue, setIssue
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