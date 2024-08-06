"use client";

import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState, useEffect } from "react";
import { ParsedPopulatedIssueType } from "@/models/Controls";


type IssueContext = {
  editMode: boolean,
  setEditMode: Dispatch<SetStateAction<boolean>>,
  issue: ParsedPopulatedIssueType,
  setIssue: Dispatch<SetStateAction<ParsedPopulatedIssueType>>,
  issueHeaderDialogOpen: boolean,
  setIssueHeaderDialogOpen: Dispatch<SetStateAction<boolean>>,
  descriptionDialogOpen: boolean,
  setDescriptionDialogOpen: Dispatch<SetStateAction<boolean>>,
  designersDialogOpen: boolean,
  setDesignersDialogOpen: Dispatch<SetStateAction<boolean>>,
  engineersDialogOpen: boolean, 
  setEngineersDialogOpen: Dispatch<SetStateAction<boolean>>,
  routeLocationDialogOpen: boolean, 
  setRouteLocationDialogOpen: Dispatch<SetStateAction<boolean>>,
  figmaLinkDialogOpen: boolean, 
  setFigmaLinkDialogOpen: Dispatch<SetStateAction<boolean>>,
  githubLinkDialogOpen: boolean, 
  setGithubLinkDialogOpen: Dispatch<SetStateAction<boolean>>,
  engFilesDialogOpen: boolean, 
  setEngFilesDialogOpen: Dispatch<SetStateAction<boolean>>,
  updateIssue: (issue: ParsedPopulatedIssueType) => void
}

const IssueContext = createContext<IssueContext | null>(null);

type IssueContextProviderProps = {
  children: ReactNode,
  initialIssue: ParsedPopulatedIssueType,
  updateIssue: (issue: ParsedPopulatedIssueType) => void
}

export function IssueContextProvider(
  {children, initialIssue, updateIssue}: IssueContextProviderProps
) {
  const [editMode, setEditMode] = useState(false);
  const [issue, setIssue] = useState(initialIssue);

  // Dialog visibility controls
  const [issueHeaderDialogOpen, setIssueHeaderDialogOpen] = useState(false);
  const [descriptionDialogOpen, setDescriptionDialogOpen] = useState(false);
  const [designersDialogOpen, setDesignersDialogOpen] = useState(false);
  const [engineersDialogOpen, setEngineersDialogOpen] = useState(false);
  const [routeLocationDialogOpen, setRouteLocationDialogOpen] = useState(false);
  const [figmaLinkDialogOpen, setFigmaLinkDialogOpen] = useState(false);
  const [githubLinkDialogOpen, setGithubLinkDialogOpen] = useState(false);
  const [engFilesDialogOpen, setEngFilesDialogOpen] = useState(false);


  useEffect(() => {
    updateIssue(issue);
  }, [issue])


  return (
    <IssueContext.Provider value={{
      editMode, 
      setEditMode, 
      issue, 
      setIssue, 
      issueHeaderDialogOpen, 
      setIssueHeaderDialogOpen,
      descriptionDialogOpen, 
      setDescriptionDialogOpen,
      designersDialogOpen, 
      setDesignersDialogOpen,
      engineersDialogOpen, 
      setEngineersDialogOpen,
      routeLocationDialogOpen, 
      setRouteLocationDialogOpen,
      figmaLinkDialogOpen, 
      setFigmaLinkDialogOpen,
      githubLinkDialogOpen, 
      setGithubLinkDialogOpen,
      engFilesDialogOpen, 
      setEngFilesDialogOpen,
      updateIssue
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