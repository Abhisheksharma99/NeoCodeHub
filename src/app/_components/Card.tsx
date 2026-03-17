'use client';

import Image, { StaticImageData } from "next/image";
import { useRef, useState } from "react";

export interface ServiceData {
  title: string;
  imageUrl?: StaticImageData | string;
  description: string;
  category?: string;
}

interface CardProps extends ServiceData {
  noOuterWrapper?: boolean;
}

export const Card: React.FC<CardProps> = ({ title, imageUrl, description, category, noOuterWrapper }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('perspective(800px) rotateX(0deg) rotateY(0deg)');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || window.innerWidth < 768) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setTransform(`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
  };

  const handleMouseLeave = () => {
    setTransform('perspective(800px) rotateX(0deg) rotateY(0deg)');
  };

  const hasImage = imageUrl && (typeof imageUrl === 'object' || (typeof imageUrl === 'string' && imageUrl.length > 0));

  const cardContent = (
    <div
      ref={cardRef}
      className="glass-card tilt-card overflow-hidden w-full flex flex-col h-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transformStyle: 'preserve-3d' }}
    >
      <div className="relative w-full h-56 bg-neutral-50/50 p-4 tilt-card-inner">
        {hasImage ? (
          typeof imageUrl === 'string' ? (
            <img
              src={imageUrl}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover p-2"
            />
          ) : (
            <Image
              src={imageUrl}
              alt={title}
              fill
              style={{ objectFit: "contain" }}
              className="object-contain p-2"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-100 via-neutral-200 to-neutral-300 flex items-center justify-center">
            <span className="text-sm font-medium text-neutral-400 font-heading tracking-wide">
              {category || title}
            </span>
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-grow tilt-card-inner">
        <h3 className="text-lg font-heading font-bold mb-2 text-neutral-900 tracking-tight">
          {title}
        </h3>
        <p className="text-neutral-700 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );

  if (noOuterWrapper) {
    return cardContent;
  }

  return (
    <div className="w-full md:w-1/2 lg:w-1/3 p-4 flex">
      {cardContent}
    </div>
  );
};
