import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/data";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  status: string;
  date: string;
  author: string;
  image: string;
}

const FILE = "blog-posts.json";

export async function GET() {
  const data = readData<BlogPost[]>(FILE);
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const posts = readData<BlogPost[]>(FILE);

  const newPost: BlogPost = {
    id: Date.now().toString(),
    title: body.title || "",
    excerpt: body.excerpt || "",
    content: body.content || "",
    category: body.category || "",
    status: body.status || "draft",
    date: body.date || new Date().toISOString().split("T")[0],
    author: body.author || "NeoCodeHub Team",
    image: body.image || "",
  };

  posts.push(newPost);
  writeData(FILE, posts);
  return NextResponse.json(newPost, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const posts = readData<BlogPost[]>(FILE);
  const index = posts.findIndex((p) => p.id === body.id);

  if (index === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  posts[index] = { ...posts[index], ...body };
  writeData(FILE, posts);
  return NextResponse.json(posts[index]);
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID required" }, { status: 400 });
  }

  const posts = readData<BlogPost[]>(FILE);
  const filtered = posts.filter((p) => p.id !== id);
  writeData(FILE, filtered);
  return NextResponse.json({ success: true });
}
