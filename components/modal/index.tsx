import React, { useEffect, useCallback } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  headerTitle: string;
  children: React.ReactNode;
  customHeader?: CustomHeaderComponent;
}

export type CustomHeaderProps = {
  onClose: () => void;
  headerTitle: string;
};

type CustomHeaderComponent = React.FC<CustomHeaderProps>;

const ModalHeader = ({ onClose, headerTitle }: Partial<ModalProps>) => {
  return (
    <div className="flex items-center gap-2">
      <button onClick={onClose} className="flex items-center">
        <span className="material-icons font-bold">arrow_back</span>
      </button>
      <h1 className="font-bold text-xl">{headerTitle}</h1>
    </div>
  );
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  headerTitle,
  customHeader: CustomHeader,
}) => {
  const handleEscKey = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );


  useEffect(() => {
    // Memoize the handleEscKey function
    const memoizedHandleEscKey = handleEscKey;

    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", memoizedHandleEscKey);
    } else {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", memoizedHandleEscKey);
    }
    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", memoizedHandleEscKey);
    };
  }, [isOpen, handleEscKey]);

  const modalClasses = `fixed inset-0 z-[100] p-4 md:p-0 flex items-center justify-center bg-black bg-opacity-50 ${
    isOpen ? "animation-fade-in" : "animation-fade-out"
  }`;

  const contentClasses = `overflow-auto relative bg-white w-full md:w-[50%] h-auto md:min-h-[100px] max-h-[80%] p-6 rounded-lg shadow-md ${
    isOpen ? "animation-scale-up" : "animation-scale-down"
  }`;

  return (
    <>
      {isOpen && (
        <div className={modalClasses} onClick={handleOverlayClick}>
          <div className={contentClasses}>
            {CustomHeader ? (
              <CustomHeader onClose={onClose} headerTitle={headerTitle} />
            ) : (
              <ModalHeader onClose={onClose} headerTitle={headerTitle} />
            )}
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
