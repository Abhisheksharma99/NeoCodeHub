import { Metadata } from "next";
import ProposalPitchPage from "../../_components/ProposalPitchPage";
import projects from "@/data/projects.json";
import {
  parseProposalParams,
  generateProposalMetadata,
} from "@/lib/personalization";

interface PageProps {
  params: Promise<{ params: string[] }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const resolvedSearch = await searchParams;
  const data = parseProposalParams(resolvedParams.params, resolvedSearch);
  const { title, description } = generateProposalMetadata(data);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: "https://neocodehub.com",
      siteName: "NeoCodeHub",
      images: [
        {
          url: "https://neocodehub.com/og-image.jpg",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function ProposalPage({
  params,
  searchParams,
}: PageProps) {
  const resolvedParams = await params;
  const resolvedSearch = await searchParams;
  const data = parseProposalParams(resolvedParams.params, resolvedSearch);

  return (
    <main>
      <ProposalPitchPage data={data} projects={projects} />
    </main>
  );
}
