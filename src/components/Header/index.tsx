import { Link, useNavigate } from 'react-router-dom';
import DropdownMessage from './DropdownMessage';
import DropdownNotification from './DropdownNotification';
import DropdownUser from './DropdownUser';
import LogoIcon from '../../images/logo/logo-icon.svg';
import DarkModeSwitcher from './DarkModeSwitcher';
import { useAppSelector } from '../../store/hooks';
import { useState, useRef, useEffect } from 'react';

const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { products, orders, users } = useAppSelector((state) => state.datas);
  const navigate = useNavigate();
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Handle clicking outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query) {
      setFilteredResults([]);
      setDropdownOpen(false);
      return;
    }

    const allItems = [
      ...products.map((p) => ({ type: "product", name: p.productName, id: p.id })),
      ...orders.map((o) => ({ type: "order", name: `Order ${o.id}`, id: o.id })),
      ...users.map((u) => ({ type: "user", name: u.username, id: u.id })),
    ];

    const results = allItems.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredResults(results.map((r) => r.name));
    setDropdownOpen(true);
  };

  const handleSelect = (itemName: string) => {
    // Find selected item
    const item =
      products.find((p) => p.productName === itemName) ||
      orders.find((o) => `Order ${o.id}` === itemName) ||
      users.find((u) => u.username === itemName);

    if (item) {
      if ("productName" in item) navigate(`/products/${item.id}`);
      else if ("id" in item && itemName.startsWith("Order")) navigate(`/order/${item.id}`);
      else if ("username" in item) navigate(`/users/${item.id}`);
    }
    setSearchQuery("");
    setFilteredResults([]);
    setDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        {/* Hamburger + Logo */}
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-50 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            {/* Hamburger icon spans */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-purple-600 dark:text-white"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>

          </button>

          <Link className="block flex-shrink-0 lg:hidden" to="/">
            <img src={LogoIcon} alt="Logo" />
          </Link>
        </div>

        {/* Search */}
        <div ref={wrapperRef} className="hidden sm:block relative w-full max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Find Top Products, Latest Orders or Users..."
            className="w-full bg-bl dark:bg-gray-800 pl-10 pr-4 py-2 rounded-md  focus:outline-none focus:ring-2 focus:ring-purple-600 dark:text-black"
            onFocus={() => searchQuery && setDropdownOpen(true)}
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-black dark:text-black">
            🔍
          </span>

          {dropdownOpen && filteredResults.length > 0 && (
            <ul className="absolute z-50 mt-1 w-full bg-white text-gray-500 dark:text-neutral-450 shadow-lg rounded-md max-h-60 overflow-y-auto">
              {filteredResults.map((item, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-400 dark:hover:bg-gray-700 hover:scale-104 hover:text-black cursor-pointer"
                  onClick={() => handleSelect(item)}
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            <DarkModeSwitcher />
            <DropdownNotification />
            <DropdownMessage />
          </ul>
          <DropdownUser />
        </div>
      </div>
    </header>
  );
};

export default Header;
