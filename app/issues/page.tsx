import { ParsedPopulatedIssueType, getPopulatedIssues } from "@/models/Controls";
import mongooseConnect from "@/lib/mongooseConnect";
import IssuesPageContent from "@/components/IssuesPageContent";

export default async function Page() {

  await mongooseConnect();
  const issues = await getPopulatedIssues();
  const parsedIssues: Array<ParsedPopulatedIssueType> = JSON.parse(JSON.stringify(issues));

  return (
    <IssuesPageContent parsedIssues={parsedIssues} />
  )
  
}