import Issue from "@/models/Issue";
import { NextRequest } from "next/server";
import mongooseConnect from "@/lib/mongooseConnect";
import checkSession from "@/lib/checkSession";

export async function POST(req: NextRequest, {params}: {params: {id: string}}) {
  try {

    await mongooseConnect();

    const noSession = await checkSession();
    if (noSession) return noSession;

    await Issue.findByIdAndDelete(params.id);

    return new Response(null, {
      status: 204,
    })

  } catch(err) {
    console.log(err);
    return Response.error();
  }
}