import React from "react";
import { createPortal } from "react-dom";
import { IoCloseSharp } from "react-icons/io5";
import "./qrModal.css";

interface ModalProps {
  isOpen: boolean;
  noContentClassName?: boolean;
  contentClassName?: string;
  children: React.ReactNode;
  className?: string;
  closeButton?: boolean;
  whiteBorder?: boolean;
  onClose: () => void;
}

export const QRModal = ({
  whiteBorder,
  closeButton,
  noContentClassName = false,
  contentClassName,
  isOpen,
  onClose,
  children,
}: ModalProps) => {
  if (!isOpen) return null;
  console.log("whiteBorder", whiteBorder);
  const overlayClass = isOpen ? "modal-overlay active" : "modal-overlay";

  return createPortal(
    <div className={overlayClass} onClick={onClose}>
      <div
        className={` ${noContentClassName ? " " : "modal-content"} ${
          contentClassName ? contentClassName : ""
        } ${whiteBorder === false ? "no-border" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {closeButton && (
          <IoCloseSharp className="close-button" onClick={() => onClose()} />
        )}
        {children}
      </div>
    </div>,
    document.body
  );
};
