import { Typography, Box, Stack, Divider } from "@mui/material";
import Issue from "@/models/Issue";
import { ParsedPopulatedIssueType, getPopulatedIssues } from "@/models/Controls";
import IssueCard from "@/components/IssueCard";

export default async function Page() {

  const issues = await getPopulatedIssues();
  const parsedIssues: Array<ParsedPopulatedIssueType> = JSON.parse(JSON.stringify(issues));

  const inDesignIssues: Array<ParsedPopulatedIssueType> = [];
  const inProgressIssues: Array<ParsedPopulatedIssueType> = []; 
  const mergingIssues: Array<ParsedPopulatedIssueType> = []; 
  const completeIssues: Array<ParsedPopulatedIssueType> = [];


  // sort out issues
  while (parsedIssues.length > 0) {
    const issue = parsedIssues.shift() as ParsedPopulatedIssueType;
    if (issue?.eng_implementation_meets_design.meets_design === true) {
      completeIssues.push(issue);
    } else if (issue?.user_stories.every(us => us.design_done && us.engineering_done)) {
      mergingIssues.push(issue);
    } else if (issue?.assigned_designers?.length > 0 && issue?.assigned_engineers.length > 0) {
      inProgressIssues.push(issue);
    } else inDesignIssues.push(issue);
  }

  const columnTuples: Array<[string, Array<ParsedPopulatedIssueType>]> = [
    ["In Design", inDesignIssues],
    ["In Progress", inProgressIssues],
    ["Merging", mergingIssues],
    ["Complete", completeIssues]
  ]

  const columns = columnTuples.map(tup => {
    return (
      <Stack direction="column" width={1/4}>
        <Stack direction="row" sx={{
          width: 1,
          justifyContent: "center",
          paddingY: 2
        }}>
          <Typography sx={{marginX: "auto"}} variant="h5">{tup[0]}</Typography>
        </Stack>
        <Divider variant="fullWidth" />
        {tup[1].map(issue => <IssueCard issue={issue} key={issue._id} />)}
      </Stack>
    )
  })


  return (
    <>
      <Typography sx={{paddingBottom: 3}} variant="h1">
        Issues
      </Typography>
      <Box width={"100%"}>
        <Stack 
          direction="row" 
          spacing={3} 
          flexShrink={1}
          flexGrow={1}
          justifyContent="space-around"
          divider={<Divider orientation="vertical" flexItem/>}
        >
          {columns}
        </Stack>
      </Box>
    </>
  )
}