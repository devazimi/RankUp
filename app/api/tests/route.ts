import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "tests.json");
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(fileContent);
    console.log("data in route: ", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in route api: ", error);
    return NextResponse.json({ error: "cannot read file" }, { status: 500 });
  }
}
