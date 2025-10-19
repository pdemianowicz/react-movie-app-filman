import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
  isLoading?: boolean;
}

export default function Pagination({ currentPage, totalPages, onPageChange, isLoading = false }: PaginationProps) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      <button
        type="button"
        onClick={handlePrevious}
        disabled={currentPage === 1 || isLoading}
        className="px-4 py-2 bg-surface hover:bg-surface/80 rounded-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        aria-label="Previous page">
        <MdKeyboardArrowLeft className="w-5 h-5" />
      </button>

      <span className="text-text-secondary">
        Page {currentPage} of {totalPages}
      </span>

      <button
        type="button"
        onClick={handleNext}
        disabled={currentPage >= totalPages || isLoading}
        className="px-4 py-2 bg-surface hover:bg-surface/80 rounded-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        aria-label="Next page">
        <MdKeyboardArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}
