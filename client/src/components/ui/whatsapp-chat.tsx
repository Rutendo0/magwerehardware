import { useState } from 'react';
import { MessageSquare, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WhatsappChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  
  const phoneNumber = '263777777777'; // Replace with your actual WhatsApp number
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Create WhatsApp URL with pre-filled message
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    setMessage('');
    setIsOpen(false);
  };
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-lg w-80 overflow-hidden transition-all transform scale-100 opacity-100">
          <div className="bg-green-600 p-4 flex justify-between items-center">
            <div className="flex items-center text-white">
              <MessageSquare className="w-6 h-6 mr-2" />
              <h3 className="font-medium">Chat with Us</h3>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              className="text-white hover:bg-green-700"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="p-4 bg-gray-50 border-b">
            <p className="text-sm text-gray-700">
              Hello! 👋 Need help with your hardware requirements? Chat with us on WhatsApp for quick assistance.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-4">
            <div className="mb-3">
              <textarea
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-sm resize-none"
                rows={3}
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center"
            >
              <Send className="w-4 h-4 mr-2" />
              Start Chat
            </Button>
          </form>
        </div>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center shadow-lg"
        >
          <MessageSquare className="w-8 h-8 text-white" />
        </Button>
      )}
    </div>
  );
};

export default WhatsappChat;