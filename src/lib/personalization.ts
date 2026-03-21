export interface ProposalData {
  name: string | null;
  company: string | null;
  project: string | null;
  message: string | null;
  ref: string | null;
  service: string | null;
}

function toTitleCase(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function parseProposalParams(
  params: string[],
  searchParams: Record<string, string | string[] | undefined>
): ProposalData {
  const getString = (key: string): string | null => {
    const val = searchParams[key];
    return typeof val === "string" ? val : null;
  };

  return {
    name: params[0] ? toTitleCase(params[0]) : null,
    company: params[1] ? toTitleCase(params[1]) : null,
    project: params[2] ? toTitleCase(params[2]) : null,
    message: getString("msg")
      ? getString("msg")!.split("-").join(" ")
      : null,
    ref: getString("ref"),
    service: getString("service")
      ? toTitleCase(getString("service")!.split("-").join(" "))
      : null,
  };
}

export function generateProposalMetadata(data: ProposalData) {
  const parts = ["NeoCodeHub"];
  if (data.name && data.company)
    parts.push(`Proposal for ${data.name}, ${data.company}`);
  else if (data.name) parts.push(`Prepared for ${data.name}`);

  const title = parts.join(" | ");

  let description =
    "Your Trusted Partner in Digital Development. Elevating Businesses with Cutting-Edge Solutions.";
  if (data.name && data.company && data.project) {
    description = `Custom proposal for ${data.company} — ${data.project}. Prepared by NeoCodeHub for ${data.name}.`;
  } else if (data.name && data.company) {
    description = `Exclusive proposal prepared for ${data.name} at ${data.company} by NeoCodeHub.`;
  } else if (data.name) {
    description = `Proposal prepared exclusively for ${data.name} by NeoCodeHub.`;
  }

  return { title, description };
}
