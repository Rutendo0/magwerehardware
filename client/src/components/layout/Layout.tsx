import { FC, ReactNode } from 'react';
import Header from './header';
import Footer from './footer';
import WhatsAppChat from '../ui/whatsapp-chat';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <WhatsAppChat />
    </div>
  );
};

export default Layout;