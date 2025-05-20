
import { FC } from 'react';

const TrustedBrands: FC = () => {
  const brands = [
    { name: "BuildPro", imageUrl: "/attached_assets/IMG-20250419-WA0019.jpg" },
    { name: "ColorMaster", imageUrl: "/attached_assets/IMG-20250419-WA0010.jpg" },
    { name: "BrightTech", imageUrl: "/attached_assets/IMG-20250419-WA0009.jpg" },
    { name: "SolarEdge", imageUrl: "/attached_assets/IMG-20250419-WA0016.jpg" },
    { name: "TileGrip", imageUrl: "/attached_assets/IMG-20250419-WA0011.jpg" },
    { name: "EpoxyMaster", imageUrl: "/attached_assets/IMG-20250419-WA0013.jpg" }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Trusted Brands We Carry</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {brands.map((brand, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={brand.imageUrl}
                  alt={brand.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.src = '/attached_assets/Logo.png';
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBrands;
