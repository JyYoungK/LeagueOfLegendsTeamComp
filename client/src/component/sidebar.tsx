import React, { useState } from "react";
import { HiOutlineMenu } from "react-icons/hi";
import { RiCloseLine } from "react-icons/ri";

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile sidebar Burger Menu */}
      <div className="absolute right-3 top-3 mt-2 block lg:hidden">
        {!mobileMenuOpen ? (
          <HiOutlineMenu
            className="mr-2 h-6 w-6 text-white"
            onClick={() => setMobileMenuOpen(true)}
          />
        ) : (
          <RiCloseLine
            className="mr-2 h-6 w-6 text-white"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </div>

      <div
        className={`w-5/8 smooth-transition absolute top-0 z-10 h-full bg-gradient-to-tl from-white/10 to-[#483D8B] p-6 backdrop-blur-lg md:hidden ${
          mobileMenuOpen ? "left-0" : "-left-full"
        }`}
      >
        {/* <NavLinks handleClick={() => setMobileMenuOpen(false)} /> */}
      </div>
    </>
  );
};

export default Sidebar;
