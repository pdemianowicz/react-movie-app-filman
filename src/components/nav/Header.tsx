import logo from "../../assets/svg/logo.svg";
import userImg from "../../assets/img/user.png";

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
  return (
    <header className="bg-surface px-5 py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center mr-4 lg:mr-12 gap-4">
          <img src={logo} alt="Filman logo" />
          <span className="text-xl font-medium">Filman</span>
        </div>
        <nav className="hidden lg:flex space-x-3 mr-auto">
          {navLinks.map((item, index) => (
            <div key={item.title + index} className="font-semibold text-text-secondary hover:text-text-primary cursor-pointer">
              {item.title}
            </div>
          ))}
        </nav>
        <img src={userImg} alt="User avatar" className="w-8 h-8" />
      </div>
    </header>
  );
}
