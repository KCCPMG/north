import { revalidatePath } from "next/cache";


export function GET() {
  const date = new Date();
  console.log("Request for date", date);
  // revalidatePath("/api/sample");
  return Response.json(`The last sign in was at ${JSON.stringify(date)}`);
}