'use client';

const items = [
  'Web Development',
  'AI Solutions',
  'Mobile Apps',
  'Cloud Infrastructure',
  'DevOps',
  'UI/UX Design',
  'E-commerce',
  'SaaS Products',
  'Data Analytics',
  'Cybersecurity',
];

export default function MarqueeBanner() {
  const doubled = [...items, ...items];

  return (
    <div className="relative py-4 overflow-hidden bg-neutral-950/95 backdrop-blur-sm border-y border-neutral-800/50">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="mx-6 md:mx-10 text-neutral-500 text-sm md:text-base font-heading font-medium whitespace-nowrap inline-flex items-center gap-3 tracking-tight select-none"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-neutral-700 shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
