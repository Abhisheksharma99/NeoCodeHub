import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/data";

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  image: string;
  tags?: string[];
}

const FILE = "projects.json";

export async function GET() {
  const data = readData<Project[]>(FILE);
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const projects = readData<Project[]>(FILE);

  const newProject: Project = {
    id: Date.now().toString(),
    title: body.title || "",
    description: body.description || "",
    category: body.category || "",
    status: body.status || "in-progress",
    image: body.image || "",
    tags: body.tags || [],
  };

  projects.push(newProject);
  writeData(FILE, projects);
  return NextResponse.json(newProject, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const projects = readData<Project[]>(FILE);
  const index = projects.findIndex((p) => p.id === body.id);

  if (index === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  projects[index] = { ...projects[index], ...body };
  writeData(FILE, projects);
  return NextResponse.json(projects[index]);
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID required" }, { status: 400 });
  }

  const projects = readData<Project[]>(FILE);
  const filtered = projects.filter((p) => p.id !== id);
  writeData(FILE, filtered);
  return NextResponse.json({ success: true });
}
