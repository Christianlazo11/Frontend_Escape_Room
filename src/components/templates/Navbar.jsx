import React, { useState, useEffect } from "react";
import { FaUserAlt, FaBars, FaPlus } from "react-icons/fa";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import LinkLogo from "../atoms/LinkLogo";
import LinkNavbar from "../atoms/LinkNavbar";
import NavItems from "../molecules/NavItems";

const Navbar = () => {
  let Links = [
    { name: "Home", link: "/" },
    { name: "About", link: "/" },
    { name: "Rooms", link: "/" },
    { name: "Contact", link: "/" },
    { name: "Educamás", link: "/" },
  ];
  const [open, setOpen] = useState(false);

  useEffect(() => {
    window.onscroll = () => {
      setOpen((prev) => {
        !prev;
      });
    };
  }, []);
  return (
    <nav className="shadow-md w-full fixed top-0 left-0 z-50">
      <div className="flex items-center justify-between bg-dark py-7  md:px-13 px-7 mx-auto">
        <LinkLogo path="/" img={logo} alt="logoeducamas" />
        <div className="flex items-center justify-between md:order-2 md:w-full">
          <div
            onClick={() => setOpen(!open)}
            className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
          >
            {open ? (
              <FaPlus className="text-white rotate-45 text-2xl my-2 hover:text-yellow sm:mt-3" />
            ) : (
              <FaBars className="text-white text-2xl my-2 hover:text-yellow sm:mt-3" />
            )}
          </div>
          <div className="md:order-2 my-1 mr-12 lg:mr-2 md:ml-5 flex cursor-pointer ">
            <FaUserAlt className="text-white text-2xl mr-2 hover:text-yellow" />
            <span className="text-white hover:text-yellow">sign in</span>
          </div>
          <NavItems links={Links} isOpen={open} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
