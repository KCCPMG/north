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

  const columnTuples: Array<[string, Array<ParsedPopulatedIssueType>]> = [
    ["In Design", inDesignIssues],
    ["In Progress", inProgressIssues],
    ["Merging", mergingIssues],
    ["Complete", completeIssues]
  ]

  const columns = columnTuples.map(tup => {
    return (
      <Stack direction="column">
        <Typography variant="h5">{tup[0]}</Typography>
      </Stack>
    )
  })


  return (
    <>
      <Typography variant="h1">
        Issues
      </Typography>
      <Box width={"100%"}>
        <Stack 
          direction="row" 
          spacing={3} 
          justifyContent="space-around"
          divider={<Divider orientation="vertical" flexItem/>}
        >
          {columns}
          {/* <Stack direction="column">
            <Typography variant="h5">In Design</Typography>
            {parsedIssues.map(issue => <IssueCard issue={issue} key={issue._id} />)}

          </Stack>
          <Stack direction="column">
            <Typography variant="h5">In Progress</Typography>
            {parsedIssues.map(issue => <IssueCard issue={issue} key={issue._id} />)}

          </Stack>
          <Stack direction="column">
            <Typography variant="h5">Merging</Typography>
            {parsedIssues.map(issue => <IssueCard issue={issue} key={issue._id} />)}

          </Stack>
          <Stack direction="column">
            <Typography variant="h5">Complete</Typography>
            {parsedIssues.map(issue => <IssueCard issue={issue} key={issue._id} />)} 
          </Stack> */}
        </Stack>
      </Box>
    </>
  )
}