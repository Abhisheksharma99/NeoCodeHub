import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Services - NeoCodeHub | Web, Mobile, AI & Cloud Solutions',
  description:
    'Explore NeoCodeHub\'s comprehensive digital services: Web Development, AI & Machine Learning, Mobile Apps, Cloud & DevOps, UI/UX Design, and E-Commerce Solutions.',
  openGraph: {
    title: 'Our Services - NeoCodeHub',
    description:
      'From web and mobile development to AI and cloud solutions, NeoCodeHub provides end-to-end digital services to help your business thrive.',
    type: 'website',
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
