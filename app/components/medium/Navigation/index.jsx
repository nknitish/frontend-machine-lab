"use client";
import { useState } from "react";
import { HomeIcon, Building2, UserRoundPlus, Menu } from "lucide-react";

const navItems = [
  {
    label: "Home",
    icon: HomeIcon,
    href: "/",
  },
  {
    label: "Shorts",
    icon: Building2,
    href: "/shorts",
  },
  {
    label: "Subscriptions",
    icon: UserRoundPlus,
    href: "/subscriptions",
  },
];

const Header = ({ isExpanded, onMenuClick }) => {
  return (
    <header className="h-16 p-2 bg-gray-700 flex gap-2 items-center">
      <button
        type="button"
        aria-label="Toggle sidebar"
        aria-expanded={isExpanded}
        className="outline p-2 cursor-pointer "
        onClick={onMenuClick}
      >
        <Menu />
      </button>
      <p> YouTube</p>
    </header>
  );
};

const NavItem = ({ item, isExpanded }) => {
  const Icon = item.icon;

  return (
    <a
      href={item.href}
      className={`
        flex w-full items-center rounded-lg
        ${
          isExpanded
            ? "flex-row justify-start gap-3 p-3"
            : "flex-col justify-center gap-1 p-2"
        }
      `}
    >
      <Icon size={24} />

      <span className={isExpanded ? "" : "text-xs"}>{item.label}</span>
    </a>
  );
};

const SideBar = ({ isExpanded }) => {
  return (
    <aside
      className={`
    shrink-0
    bg-red-200
    ${isExpanded ? "w-60" : "w-18"}
  `}
    >
      <nav>
        {navItems.map((item) => (
          <NavItem key={item.href} isExpanded={isExpanded} item={item} />
        ))}
      </nav>
    </aside>
  );
};

const App = () => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  return (
    <div className="flex flex-col h-screen">
      <Header
        isExpanded={isSidebarExpanded}
        onMenuClick={() => setIsSidebarExpanded((prev) => !prev)}
      />

      <div className="flex flex-1">
        <SideBar isExpanded={isSidebarExpanded} />

        <main className="bg-blue-200 flex-1 p-2">
          <p>Main </p>
        </main>
      </div>
    </div>
  );
};

export default App;
