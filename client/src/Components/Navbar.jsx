import React, { useState } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

import logo from "../../Images/logo.png";

// Custom functional component for each navbar item
const NavBarItem = ({ title, classprops }) => (
  <li className={`mx-4 cursor-pointer ${classprops}`}>{title}</li>
);

const Navbar = () => {
  // State for toggling the mobile menu
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    // Navbar container
    <nav className="w-full flex md:justify-center justify-between items-center p-4 fixed top-0 bg-transparent z-50">
      {/* Logo */}
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <img src={logo} alt="logo" className="w-20 cursor-pointer absolute left-5 top-0" />
      </div>

      {/* Desktop navigation menu */}
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {["Market", "Exchange", "Tutorials", "Wallets"].map((item, index) => (
          <NavBarItem key={item + index} title={item} />
        ))}
        <li className="bg-[#111113] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#373738]">
          Login
        </li>
      </ul>

      {/* Mobile menu icon and dropdown */}
      <div className="flex relative">
        {/* Mobile menu open icon */}
        {!toggleMenu && (
          <HiMenuAlt4
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(true)}
          />
        )}

        {/* Mobile menu close icon */}
        {toggleMenu && (
          <AiOutlineClose
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(false)}
          />
        )}

        {/* Mobile menu dropdown */}
        {toggleMenu && (
          <ul
            className="z-50 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2">
              {/* Close mobile menu icon */}
              <AiOutlineClose onClick={() => setToggleMenu(false)} />
            </li>
            {["Market", "Exchange", "Tutorials", "Wallets"].map(
              (item, index) => (
                <NavBarItem key={item + index} title={item} classprops="my-2 text-lg" />
              )
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;


