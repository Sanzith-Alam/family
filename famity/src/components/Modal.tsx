import React from 'react';
import { createPortal } from 'react-dom';
import Button from './Button'; // Assuming you have a Button component

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, className }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className={`bg-white rounded-lg shadow-xl p-6 max-w-lg w-full relative ${className}`}>
        <div className="flex justify-between items-center mb-4">
          {title && <h2 className="text-2xl font-bold text-gray-800">{title}</h2>}
          <Button variant="secondary" size="small" onClick={onClose} className="ml-auto p-1 text-gray-600 hover:text-gray-900">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Button>
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;