// components/Modal.tsx
import { ReactNode, useState } from 'react';

interface ModalProps {
  children: ReactNode;
}

interface ModalComposition {
  Header: React.FC;
  Body: React.FC;
  Action: React.FC;
}

const Modal: React.FC<ModalProps> & ModalComposition = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        {children}
      </div>
    </div>
  );
};

const ModalHeader = ({ children }: any) => {
  return <div className="mb-4">{children}</div>;
};

const ModalBody = ({ children }: any) => {
  return <div className="mb-4">{children}</div>;
};

const ModalAction = ({ children }: any) => {
  return <div className="flex justify-end">{children}</div>;
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Action = ModalAction;

export default Modal;
