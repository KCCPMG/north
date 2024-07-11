import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {

    console.log("incoming");
    const query = req.nextUrl.searchParams.get('query');
    return Response.json(query);

  } catch (err) {
    console.log(err);
    throw err;
  }
}