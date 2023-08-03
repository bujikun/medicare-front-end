import { doPUTFormBody } from "@/lib/util";
import { log } from "console";
import { writeFile, writeFileSync } from "fs";
import { NextResponse } from "next/server";
import { join } from "path";
import { v4 as uuid } from "uuid";

const POST = async (request) => {
  return doImageUpload(request);
};
export {POST}