"use client";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import { IssueContextProvider } from "@/context/IssueContext";
import { ParsedPopulatedIssueType } from "@/models/Controls";
import IssueCard from "@/components/IssueCard";
import { useState, useEffect } from "react";
import NewIssueDialog from "./NewIssueDialog";
import { useSession } from "next-auth/react";


type IssuesPageContentProps = {
  parsedIssues: Array<ParsedPopulatedIssueType>
}

export default function IssuesPageContent(
  { parsedIssues }: IssuesPageContentProps
) {

  const {data: session} = useSession();

  const [issues, setIssues] = useState<Array<ParsedPopulatedIssueType>>(parsedIssues) 

  const [inDesignIssues, setInDesignIssues] = useState<Array<ParsedPopulatedIssueType>>([]);
  const [inProgressIssues, setInProgressIssues] = useState<Array<ParsedPopulatedIssueType>>([]);
  const [mergingIssues, setMergingIssues] = useState<Array<ParsedPopulatedIssueType>>([]);
  const [completeIssues, setCompleteIssues] = useState<Array<ParsedPopulatedIssueType>>([]);

  const [showNewIssueDialog, setShowNewIssueDialog] = useState(false);


  useEffect(() => {
    // sort out issues
    const issuesCopy = [...issues];

    const completeIssuesCopy = [];
    const mergingIssuesCopy = [];
    const inProgressIssuesCopy = [];
    const inDesignIssuesCopy = [];
    
    while (issuesCopy.length > 0) {
      const issue = issuesCopy.shift() as ParsedPopulatedIssueType;
      if (issue?.eng_implementation_meets_design.meets_design === true) {
        completeIssuesCopy.push(issue);
      } else if (issue?.user_stories.every(us => us.design_done && us.engineering_done)) {
        mergingIssuesCopy.push(issue);
      } else if (issue?.assigned_designers?.length > 0 && issue?.assigned_engineers.length > 0) {
        inProgressIssuesCopy.push(issue);
      } else inDesignIssuesCopy.push(issue);
    }
   
    setCompleteIssues(completeIssuesCopy);
    setMergingIssues(mergingIssuesCopy);
    setInProgressIssues(inProgressIssuesCopy);
    setInDesignIssues(inDesignIssuesCopy);

  }, [issues])


  function addIssue(issue: ParsedPopulatedIssueType) {
    const issuesCopy = [...issues];
    issuesCopy.push(issue);
    setIssues(issuesCopy);
  }

  // an undefined issue will mean to delete this issue
  function updateIssue(id: string, issue: ParsedPopulatedIssueType | undefined) {
    console.log("update issue");
    const issuesCopy = [...issues].filter(i => i._id !== id);
    if (issue) issuesCopy.push(issue);
    setIssues(issuesCopy);
  }

  const columnTuples: Array<[string, Array<ParsedPopulatedIssueType>]> = [
    ["In Design", inDesignIssues],
    ["In Progress", inProgressIssues],
    ["Merging", mergingIssues],
    ["Complete", completeIssues]
  ]

  return (
    <>
      <Stack justifyContent="space-between" direction="row">
        <Typography sx={{paddingBottom: 3}} variant="h1">
          Issues
        </Typography>
        {session?.user && 
          <Button 
            variant="outlined"
            onClick={() => setShowNewIssueDialog(true)}
          >
            New Issue
          </Button>
        }
      </Stack>
      <Box width={"100%"}>
        <Stack 
          direction="row" 
          spacing={3} 
          flexShrink={1}
          flexGrow={1}
          justifyContent="space-around"
          divider={<Divider orientation="vertical" flexItem/>}
        >
          {
            columnTuples.map(tup => {
              return (
                <Stack 
                  direction="column" 
                  width={1/4} 
                  key={tup[0].toLowerCase().replaceAll(" ", "-")}
                  spacing={1}
                >
                  <Stack direction="row" sx={{
                    width: 1,
                    justifyContent: "center",
                    paddingY: 2
                  }}>
                    <Typography sx={{marginX: "auto"}} variant="h5">
                      {tup[0]}
                    </Typography>
                  </Stack>
                  <Divider variant="fullWidth" />
                  {tup[1].map(issue => (
                    <IssueContextProvider 
                      initialIssue={issue} 
                      key={issue._id.toString()}   
                      updateIssue={updateIssue}                   
                    >
                      <IssueCard initialIssue={issue} key={issue._id} />
                    </IssueContextProvider>
                  ))}
                </Stack>
              )
            })
          }
        </Stack>
      </Box>
      {session?.user &&  
        <NewIssueDialog 
          open={showNewIssueDialog}
          handleClose={() => setShowNewIssueDialog(false)}
          addIssue={addIssue}
        />
      }
    </>
  )
}