import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - NeoCodeHub | Get In Touch',
  description:
    'Reach out to NeoCodeHub for your next web, mobile, or AI project. Get a free quote, discuss your ideas, or schedule a consultation with our expert team.',
  openGraph: {
    title: 'Contact Us - NeoCodeHub',
    description:
      'Have a project in mind? Contact NeoCodeHub to discuss how we can transform your ideas into reality.',
    type: 'website',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
