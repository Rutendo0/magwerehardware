import { FC } from 'react';
import HeroBanner from '@/components/home/hero-banner';
import PromoBanner from '@/components/home/promo-banner';
import CategorySection from '@/components/home/category-section';
import FeaturedProductsNew from '@/components/home/featured-products-new';
import SolarSolutionsBanner from '@/components/home/solar-solutions-banner';
import TilingSolutions from '@/components/home/tiling-solutions';
import SpecialOffers from '@/components/home/special-offers';
import ReferralProgram from '@/components/home/referral-program';
import StoreLocation from '@/components/home/store-location';
import Newsletter from '@/components/home/newsletter';

const Home: FC = () => {
  return (
    <main>
      <HeroBanner />
      <PromoBanner />
      <CategorySection />
      <FeaturedProductsNew />
      <SolarSolutionsBanner />
      <TilingSolutions />
      <SpecialOffers />
      <ReferralProgram />
      <StoreLocation />
      <Newsletter />
    </main>
  );
};

export default Home;
