import { useIssueContext } from "@/context/IssueContext";
import { IIssue } from "@/models/Issue";
import { IUserStory } from "@/models/UserStory";
import { Dispatch, SetStateAction } from "react";
import { ParsedPopulatedIssueType } from "@/models/Controls";


export async function saveIssue(
  issueId: string, 
  bodyObj: Partial<IIssue>,
  setIssue: Dispatch<SetStateAction<ParsedPopulatedIssueType>>
) {

  try {
    const response = await fetch(`api/issues/${issueId}`, {
      method: 'post',
      body: JSON.stringify(bodyObj)
    })
    if (response.status >= 400) throw new Error("Response Error");
    const json = await response.json();
    console.log(json);
    setIssue(json);
  } catch(err) {
    console.log(err);
    throw err;
  }
}


export async function saveUserStory(
  userStoryId: string, 
  bodyObj: Partial<IUserStory>,
  setIssue: Dispatch<SetStateAction<ParsedPopulatedIssueType>>
) {

  try {
    const response = await fetch(`api/userStories/${userStoryId}`, {
      method: 'post',
      body: JSON.stringify({story: bodyObj})
    })
    if (response.status >= 400) throw new Error("Response Error");
    const json = await response.json();
    console.log(json);
    setIssue(json);
  } catch(err) {
    console.log(err);
    throw err;
  }
}