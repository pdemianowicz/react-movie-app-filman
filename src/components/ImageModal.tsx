import { useEffect } from "react";
import { createPortal } from "react-dom";
import { FaTimes } from "react-icons/fa";

interface ImageModalProps {
  isOpen: boolean;
  imgUrl: string | null;
  onClose: () => void;
}

export default function ImageModal({ isOpen, onClose, imgUrl }: ImageModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div>
      {isOpen && (
        <div aria-modal="true" role="dialog" onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div onClick={(e) => e.stopPropagation()} className="relative max-w-7xl px-4 w-full">
            <img src={imgUrl || ""} alt="Preview" className="rounded-md max-h-[90vh] mx-auto object-contain" />
            <button
              onClick={onClose}
              className="absolute top-4 right-6 text-white bg-black/40 hover:bg-black/60 rounded-full p-2 transition cursor-pointer"
              aria-label="Close image">
              <FaTimes className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>,
    document.body
  );
}
