import Image, { StaticImageData } from "next/image";

export interface ServiceData {
  title: string;
  imageUrl: StaticImageData;
  description: string;
}

export const Card: React.FC<ServiceData> = ({ title, imageUrl, description }) => {
  return (
    <div className="w-full md:w-1/2 lg:w-1/3 p-4 flex">
      <div className="border border-gray-200 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:-translate-y-1 w-full flex flex-col h-full">
        
        {/* Image container with proper containment */}
        <div className="relative w-full h-64">
          <Image 
            src={imageUrl} 
            alt={title} 
            fill 
            style={{ objectFit: 'contain' }}  // Ensures the image fits without cropping
            className="object-contain" 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Adjust sizes based on your design
            priority  // Optional: prioritize loading for important images
          />
        </div>

        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
};
