import { NextRequest, NextResponse } from "next/server";
import { readData, writeData } from "@/lib/data";

interface Testimonial {
  id: string;
  author: string;
  company: string;
  role: string;
  content: string;
  rating: number;
}

const FILE = "testimonials.json";

export async function GET() {
  const data = readData<Testimonial[]>(FILE);
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const testimonials = readData<Testimonial[]>(FILE);

  const newTestimonial: Testimonial = {
    id: Date.now().toString(),
    author: body.author || "",
    company: body.company || "",
    role: body.role || "",
    content: body.content || "",
    rating: body.rating || 5,
  };

  testimonials.push(newTestimonial);
  writeData(FILE, testimonials);
  return NextResponse.json(newTestimonial, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const testimonials = readData<Testimonial[]>(FILE);
  const index = testimonials.findIndex((t) => t.id === body.id);

  if (index === -1) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  testimonials[index] = { ...testimonials[index], ...body };
  writeData(FILE, testimonials);
  return NextResponse.json(testimonials[index]);
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID required" }, { status: 400 });
  }

  const testimonials = readData<Testimonial[]>(FILE);
  const filtered = testimonials.filter((t) => t.id !== id);
  writeData(FILE, filtered);
  return NextResponse.json({ success: true });
}
