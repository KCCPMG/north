"use client";

import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";
import { ParsedPopulatedIssueType } from "@/models/Controls";


type IssueContext = {
  editMode: boolean,
  setEditMode: Dispatch<SetStateAction<boolean>>,
  issue: ParsedPopulatedIssueType,
  setIssue: Dispatch<SetStateAction<ParsedPopulatedIssueType>>,
  descriptionDialogOpen: boolean,
  setDescriptionDialogOpen: Dispatch<SetStateAction<boolean>>,
  designersDialogOpen: boolean,
  setDesignersDialogOpen: Dispatch<SetStateAction<boolean>>,
  engineersDialogOpen: boolean, 
  setEngineersDialogOpen: Dispatch<SetStateAction<boolean>>  
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

  // Dialog visibility controls
  const [descriptionDialogOpen, setDescriptionDialogOpen] = useState(false);
  const [designersDialogOpen, setDesignersDialogOpen] = useState(false);
  const [engineersDialogOpen, setEngineersDialogOpen] = useState(false);


  return (
    <IssueContext.Provider value={{
      editMode, 
      setEditMode, 
      issue, 
      setIssue, 
      descriptionDialogOpen, 
      setDescriptionDialogOpen,
      designersDialogOpen, 
      setDesignersDialogOpen,
      engineersDialogOpen, 
      setEngineersDialogOpen  
      
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