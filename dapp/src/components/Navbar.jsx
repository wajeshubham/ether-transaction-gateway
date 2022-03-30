import React, { useState } from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

const NavbarItem = ({ title, classProps, onClick }) => {
  return (
    <li className={`mx-4 cursor-pointer ${classProps}`} onClick={onClick}>
      {title}
    </li>
  );
};

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <nav className="w-full flex md:justify-center items-center p-4">
      <div className="md:flex-[0.85] flex-initial justify-center items-center">
        <h1 className="text-3xl text-white font-bold">DTransact</h1>
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-center items-center flex-initial">
        {["Market", "Exchange", "Wallets", "Free"].map((item, i) => {
          return <NavbarItem key={i} title={item} />;
        })}
        <li className="bg-[#2952e3] py-2 px-7 ml-4 rounded-full cursor-pointer hover:bg-[#2546bd] w-full flex justify-center items-center">
          Login
        </li>
      </ul>
      <div className="flex relative ml-auto mf:hidden">
        {!toggleMenu && (
          <HiMenuAlt4
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <AiOutlineClose
            fontSize={28}
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(false)}
          />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
            flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2">
              <AiOutlineClose
                className="cursor-pointer"
                onClick={() => setToggleMenu(false)}
              />
            </li>
            {["Market", "Exchange", "Tutorials", "Wallets"].map(
              (item, index) => (
                <NavbarItem
                  key={item + index}
                  title={item}
                  classProps="my-2 text-lg"
                  onClick={() => setToggleMenu(false)}
                />
              )
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
