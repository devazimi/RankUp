import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

import { Params } from "@/app/types/testsType";

export async function GET(_: Request, { params }: Params) {
  try {
    const { id } = await params;

    const filePath = path.join(process.cwd(), "tests.json");
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(fileContent);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const test = data.find((t: any) => t.id === id);

    if (!test) {
      return NextResponse.json({ error: "test not found" }, { status: 404 });
    }

    // console.log("Test: ", test);

    return NextResponse.json(test);
  } catch (err) {
    console.error("error in route api: ", err);
    return NextResponse.json({ error: "Cannot read file" }, { status: 500 });
  }
}
