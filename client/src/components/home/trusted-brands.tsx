
import { FC } from 'react';

const TrustedBrands: FC = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Trusted Brands We Carry</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {/* Add partner logos here */}
          {Array(6).fill(0).map((_, i) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow-sm flex items-center justify-center">
              <div className="h-12 w-24 bg-gray-200 animate-pulse rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBrands;
