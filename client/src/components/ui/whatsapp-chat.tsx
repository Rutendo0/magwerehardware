import { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { Button } from './button';

const WhatsAppChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = '0779656666'; // Magwere Hardware WhatsApp number
  
  const handleChatButtonClick = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };
  
  const openWhatsApp = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=Hello! I'm interested in your products.`;
    window.open(whatsappUrl, '_blank');
  };
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="bg-white rounded-lg shadow-lg p-4 mb-4 w-72 border border-gray-200 animate-fade-in">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <div className="bg-green-500 rounded-full w-10 h-10 flex items-center justify-center mr-2">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="white"
                >
                  <path d="M17.6 6.32A7.85 7.85 0 0 0 12.07 4a7.94 7.94 0 0 0-6.75 12l-.86 3.14 3.23-.83a7.93 7.93 0 0 0 3.8.97A7.95 7.95 0 0 0 17.6 6.32zm-5.53 12.18a6.6 6.6 0 0 1-3.36-.92l-.24-.14-2.5.65.67-2.43-.16-.25a6.6 6.6 0 0 1-1.01-3.52 6.6 6.6 0 0 1 6.6-6.6 6.56 6.56 0 0 1 4.66 1.93 6.58 6.58 0 0 1 1.94 4.67 6.6 6.6 0 0 1-6.6 6.6zm3.62-4.93c-.2-.1-1.17-.58-1.35-.64-.18-.07-.32-.1-.45.1-.13.2-.5.64-.62.77-.11.13-.23.15-.43.05a5.44 5.44 0 0 1-2.7-2.34c-.2-.35.2-.33.58-1.1.07-.13.03-.24-.02-.34-.05-.1-.45-1.08-.62-1.47-.16-.39-.33-.33-.45-.33-.12 0-.25-.03-.38-.03s-.35.05-.53.25c-.18.2-.69.67-.69 1.64 0 .97.7 1.9.8 2.03.1.13 1.37 2.08 3.32 2.93.46.2.82.32 1.1.4.47.15.89.13 1.22.08.37-.06 1.15-.47 1.31-.92.17-.46.17-.85.12-.93-.05-.08-.18-.13-.38-.23z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Chat with us</h3>
                <p className="text-xs text-gray-500">We typically reply in a few minutes</p>
              </div>
            </div>
            <button 
              className="text-gray-400 hover:text-gray-600"
              onClick={() => setIsOpen(false)}
            >
              <X size={18} />
            </button>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <p className="text-sm text-gray-700">👋 Hello! How can we help you today?</p>
          </div>
          
          <Button 
            className="w-full bg-green-500 hover:bg-green-600 text-white flex items-center justify-center gap-2"
            onClick={openWhatsApp}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="white"
            >
              <path d="M17.6 6.32A7.85 7.85 0 0 0 12.07 4a7.94 7.94 0 0 0-6.75 12l-.86 3.14 3.23-.83a7.93 7.93 0 0 0 3.8.97A7.95 7.95 0 0 0 17.6 6.32zm-5.53 12.18a6.6 6.6 0 0 1-3.36-.92l-.24-.14-2.5.65.67-2.43-.16-.25a6.6 6.6 0 0 1-1.01-3.52 6.6 6.6 0 0 1 6.6-6.6 6.56 6.56 0 0 1 4.66 1.93 6.58 6.58 0 0 1 1.94 4.67 6.6 6.6 0 0 1-6.6 6.6zm3.62-4.93c-.2-.1-1.17-.58-1.35-.64-.18-.07-.32-.1-.45.1-.13.2-.5.64-.62.77-.11.13-.23.15-.43.05a5.44 5.44 0 0 1-2.7-2.34c-.2-.35.2-.33.58-1.1.07-.13.03-.24-.02-.34-.05-.1-.45-1.08-.62-1.47-.16-.39-.33-.33-.45-.33-.12 0-.25-.03-.38-.03s-.35.05-.53.25c-.18.2-.69.67-.69 1.64 0 .97.7 1.9.8 2.03.1.13 1.37 2.08 3.32 2.93.46.2.82.32 1.1.4.47.15.89.13 1.22.08.37-.06 1.15-.47 1.31-.92.17-.46.17-.85.12-.93-.05-.08-.18-.13-.38-.23z"/>
            </svg>
            Start Chat
          </Button>
        </div>
      )}
      
      <button
        className={`${
          isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
        } rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-all`}
        onClick={handleChatButtonClick}
      >
        {isOpen ? (
          <X size={24} className="text-white" />
        ) : (
          <MessageSquare size={24} className="text-white" />
        )}
      </button>
    </div>
  );
};

export default WhatsAppChat;