import { loadS3IntoPinecone } from "@/lib/pipecone";
import { NextResponse } from "next/server";

// /api/create-chat
export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const {file_key, file_name} = body;
    const pages = await loadS3IntoPinecone(file_key);
    return NextResponse.json({pages});
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
