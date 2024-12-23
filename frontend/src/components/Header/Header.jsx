import { useEffect, useRef, useCallback, useContext, useState } from "react";
import logo from "../../assets/images/logo.png";
import { NavLink, Link } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { authContext } from "../../context/AuthContext";

const navLinks = [
  { path: "/home", display: "Home" },
  { path: "/doctors", display: "Find a Doctor" },
  { path: "/services", display: "Services" },
  { path: "/contact", display: "Contact" },
];

const Header = () => {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, role, token } = useContext(authContext);

  const handleStickyHeader = useCallback(() => {
    const onScroll = () => {
      if (window.scrollY > 80) {
        headerRef.current?.classList.add("sticky_header");
      } else {
        headerRef.current?.classList.remove("sticky_header");
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    handleStickyHeader();
  }, [handleStickyHeader]);

  const toggleMenu = () => setMenuOpen((prevState) => !prevState);

  return (
    <header
      className="header flex items-center"
      ref={headerRef}
    >
      <div className="container">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div>
            <img
              src={logo}
              alt="Company Logo"
            />
          </div>

          {/* Navigation Menu */}
          <nav
            ref={menuRef}
            className={`navigation ${
              menuOpen ? "show_menu" : "hidden md:flex"
            }`}
          >
            <ul className="menu flex flex-col md:flex-row items-center gap-[2.7rem]">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      isActive
                        ? "text-primaryColor text-[16px] leading-7 font-[600]"
                        : "text-textColor text-[16px] leading-7 font-[500] hover:text-primaryColor"
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {token && user ? (
              <Link
                to={
                  role === "doctor"
                    ? "/doctors/profile/me"
                    : "/users/profile/me"
                }
                className="flex items-center gap-2"
                onClick={() => setMenuOpen(false)} // Close the menu on link click
              >
                <figure className="w-[35px] h-[35px] rounded-full cursor-pointer">
                  <img
                    src={user.photo || "/default-avatar.png"}
                    className="w-full h-full object-cover rounded-full"
                    alt={user.name || "User Profile"}
                  />
                </figure>
                <h2 className="text-[14px] font-semibold">{user.name}</h2>
              </Link>
            ) : (
              <Link to="/login">
                <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
                  Login
                </button>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <span
              className="md:hidden"
              onClick={toggleMenu}
            >
              <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
