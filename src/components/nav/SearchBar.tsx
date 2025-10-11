import { LuSearch } from "react-icons/lu";
import { IoIosArrowBack } from "react-icons/io";

export interface SearchBarProps {
  onClose?: () => void;
}

export default function SearchBar({ onClose }: SearchBarProps) {
  return (
    <div className="flex items-center gap-2 absolute lg:static left-0 right-0 top-5 bg-surface px-2">
      <button type="button" onClick={onClose} title="Close search bar" className="lg:hidden w-10 h-10 rounded-full hover:bg-slate-700 cursor-pointer">
        <IoIosArrowBack className="w-5 h-5 mx-2 text-text-secondary" />
      </button>
      <div className="flex items-center bg-background rounded-xl lg:mr-4 w-full">
        <LuSearch className="text-text-secondary mx-2" />
        <div className="flex-1 w-full">
          <input
            type="text"
            placeholder="Search (Press '/' to focus)"
            autoComplete="off"
            spellCheck="false"
            className="w-full lg:w-64 py-2.5 lg:py-1.5 outline-none text-sm"
          />
        </div>
      </div>
    </div>
  );
}
