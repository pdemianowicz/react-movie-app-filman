import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FaTimes } from "react-icons/fa";
import LoadingSpinner from "./LoadingSpinner";

interface ImageModalProps {
  isOpen: boolean;
  imgUrl: string | null;
  onClose: () => void;
}

export default function ImageModal({ isOpen, onClose, imgUrl }: ImageModalProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

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

  useEffect(() => {
    if (isOpen) {
      setImageLoaded(false);
    }
  }, [isOpen, imgUrl]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          aria-modal="true"
          role="dialog"
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <button
            onClick={onClose}
            className="absolute top-4 right-6 text-white bg-black/40 hover:bg-black/60 rounded-full p-2 transition cursor-pointer"
            aria-label="Close image">
            <FaTimes className="w-5 h-5" />
          </button>
          <div onClick={(e) => e.stopPropagation()} className="relative max-w-7xl px-4 w-full">
            {!imageLoaded && (
              <div className="flex items-center justify-center min-w-7xl">
                <LoadingSpinner />
              </div>
            )}

            <img
              src={imgUrl || ""}
              onLoad={() => setImageLoaded(true)}
              alt="Preview"
              className={`rounded-md max-h-[90vh] mx-auto object-contain transition-opacity duration-300 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
