import { ReactNode } from 'react';
import Header from './header';
import Footer from './footer';
import WhatsappChat from '@/components/ui/whatsapp-chat';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <WhatsappChat />
    </div>
  );
};

export default Layout;