import logo from "../../assets/svg/logo.svg";
import userImg from "../../assets/img/user.png";
import SearchBar from "./SearchBar";
import { LuSearch } from "react-icons/lu";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export interface NavLinksItem {
  title: string;
  url: string;
}

const navLinks: NavLinksItem[] = [
  { title: "Home", url: "/" },
  { title: "Movies", url: "/movies" },
  { title: "Serials", url: "/serials" },
  { title: "Bookmarks", url: "/bookmarks" },
];

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="bg-surface px-5 py-6 relative">
      <div className="flex items-center justify-between">
        {/* logo */}
        <div className="flex items-center mr-4 lg:mr-12 gap-4">
          <img src={logo} alt="Filman logo" />
          <span className="text-xl font-medium">Filman</span>
        </div>

        {/* nav */}
        <nav className="hidden md:flex space-x-3 mr-auto">
          {navLinks.map((item, index) => (
            <NavLink
              to={item.url}
              key={item.title + index}
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-700 transition-colors ${
                  isActive ? "text-text-primary bg-gray-900" : "text-text-secondary hover:text-text-primary"
                }`
              }>
              {item.title}
            </NavLink>
          ))}
        </nav>
        {/* searchBar desktop*/}
        <div className="hidden lg:block">
          <SearchBar />
        </div>

        {/* searchBar button */}
        <button
          type="button"
          title="Close search bar"
          onClick={() => setIsSearchOpen(true)}
          className="lg:hidden w-8 h-8 ml-auto mr-4 cursor-pointer">
          <LuSearch className="w-5 h-5 mx-2 text-text-secondary" />
        </button>
        {/* searchBar mobile*/}
        {isSearchOpen && (
          <div className="lg:hidden">
            <SearchBar onClose={() => setIsSearchOpen(false)} />
          </div>
        )}
        {/* user avatar */}
        <img src={userImg} alt="User avatar" className="w-8 h-8" />
      </div>
    </header>
  );
}
