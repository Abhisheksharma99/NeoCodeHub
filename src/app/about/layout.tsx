import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - NeoCodeHub | Our Story, Values & Mission',
  description:
    'Learn about NeoCodeHub, our journey from 2020 to today, our core values of Innovation, Quality, and Collaboration, and how we transform ideas into digital reality.',
  openGraph: {
    title: 'About Us - NeoCodeHub',
    description:
      'Discover the story behind NeoCodeHub. Meet the team transforming ideas into cutting-edge digital solutions since 2020.',
    type: 'website',
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
