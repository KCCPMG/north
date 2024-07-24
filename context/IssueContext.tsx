"use client";

import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";
import { ParsedPopulatedIssueType } from "@/models/Controls";


type IssueContext = {
  editMode: boolean,
  setEditMode: Dispatch<SetStateAction<boolean>>,
  issue: ParsedPopulatedIssueType,
  setIssue: Dispatch<SetStateAction<ParsedPopulatedIssueType>>,
  descriptionModalOpen: boolean,
  setDescriptionModalOpen: Dispatch<SetStateAction<boolean>>,
}

const IssueContext = createContext<IssueContext | null>(null);

type IssueContextProviderProps = {
  children: ReactNode,
  initialIssue: ParsedPopulatedIssueType
}

export function IssueContextProvider(
  {children, initialIssue}: IssueContextProviderProps
) {
  const [editMode, setEditMode] = useState(false);
  const [issue, setIssue] = useState(initialIssue);

  // description
  const [descriptionModalOpen, setDescriptionModalOpen] = useState(false);



  return (
    <IssueContext.Provider value={{
      editMode, 
      setEditMode, 
      issue, 
      setIssue, 
      descriptionModalOpen, 
      setDescriptionModalOpen
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