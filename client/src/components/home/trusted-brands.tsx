
import { FC } from 'react';

const TrustedBrands: FC = () => {
  const brands = [
    { name: "Total", imageUrl: "/attached_assets/total.png" },
    { name: "Splash", imageUrl: "/attached_assets/splash.png" },
    { name: "Rhi-Lite", imageUrl: "/attached_assets/rhi.jfif" },
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
