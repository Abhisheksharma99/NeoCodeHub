import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/data";

interface ProposalLink {
  id: string;
  name: string;
  company: string;
  project: string;
  message: string;
  ref: string;
  service: string;
  url: string;
  createdAt: string;
}

const FILE = "proposals.json";

export async function GET() {
  const data = readData<ProposalLink[]>(FILE);
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const proposals = readData<ProposalLink[]>(FILE);

  const newProposal: ProposalLink = {
    id: Date.now().toString(),
    name: body.name || "",
    company: body.company || "",
    project: body.project || "",
    message: body.message || "",
    ref: body.ref || "",
    service: body.service || "",
    url: body.url || "",
    createdAt: new Date().toISOString(),
  };

  proposals.unshift(newProposal);
  // Keep max 100 proposals
  if (proposals.length > 100) proposals.length = 100;
  writeData(FILE, proposals);
  return NextResponse.json(newProposal, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID required" }, { status: 400 });
  }

  const proposals = readData<ProposalLink[]>(FILE);
  const filtered = proposals.filter((p) => p.id !== id);
  writeData(FILE, filtered);
  return NextResponse.json({ success: true });
}
