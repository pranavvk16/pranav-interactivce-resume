
import { useEffect, useState, ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  const [animationClass, setAnimationClass] = useState('');
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setAnimationClass('animate-scale-in');
    } else {
      document.body.style.overflow = 'auto';
      setAnimationClass('animate-scale-out');
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      <div className={`relative bg-futuristic-dark border border-futuristic-blue/30 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-xl ${animationClass}`}>
        <div className="flex items-center justify-between p-4 border-b border-futuristic-blue/20">
          <h3 className="text-xl font-medium text-white">{title}</h3>
          <button 
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors rounded-full p-1 hover:bg-white/10"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
