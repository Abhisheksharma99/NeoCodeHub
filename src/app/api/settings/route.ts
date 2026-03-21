import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/data";

interface Settings {
  siteName: string;
  siteUrl: string;
  contactEmail: string;
  phone: string;
  address: string;
  emailjsServiceId: string;
  emailjsTemplateId: string;
  emailjsPublicKey: string;
  primaryColor: string;
  accentColor: string;
}

const FILE = "settings.json";

export async function GET() {
  const data = readData<Settings>(FILE);
  return NextResponse.json(data);
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  writeData(FILE, body);
  return NextResponse.json(body);
}
