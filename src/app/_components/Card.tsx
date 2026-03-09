import Image, { StaticImageData } from "next/image";

export interface ServiceData {
  title: string;
  imageUrl: StaticImageData;
  description: string;
}

export const Card: React.FC<ServiceData> = ({ title, imageUrl, description }) => {
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 p-4 flex">
      <div className="glass-card overflow-hidden w-full flex flex-col h-full">
        <div className="relative w-full h-56 bg-neutral-50/50 p-4">
          <Image
            src={imageUrl}
            alt={title}
            fill
            style={{ objectFit: "contain" }}
            className="object-contain p-2"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-lg font-heading font-bold mb-2 text-neutral-900 tracking-tight">
            {title}
          </h3>
          <p className="text-neutral-500 text-sm leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};
