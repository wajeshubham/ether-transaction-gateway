import React from "react";
import { FaGithub } from "react-icons/fa";

const Footer = () => (
  <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer">
    <div className="w-full flex sm:flex-row flex-col justify-center items-center my-4">
      <div className="flex flex-[0.5] justify-center items-center">
        <h1 className="text-3xl text-white font-bold">DTransact</h1>
      </div>
    </div>

    <div className="flex justify-center items-center flex-col mt-5">
      <p className="text-white text-sm text-center">
        Come join us and hear for the unexpected miracle
      </p>
      <a
        href="https://github.com/wajeshubham/ether-transaction-gateway"
        className="underline mt-4 text-white text-left text-xs flex gap-2 justify-center align-middle items-center relative"
      >
        Go to the repository
      </a>
    </div>

    <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5 " />

    <div className="sm:w-[90%] w-full flex justify-between items-center mt-3">
      <a
        href="https://github.com/wajeshubham"
        className="underline text-white text-left text-xs flex gap-2 justify-center align-middle items-center relative"
      >
        <FaGithub className="block relative -bottom-0.5" /> @wajeshubham
      </a>
      <a className="text-white text-right text-xs">Built using Vite</a>
    </div>
  </div>
);

export default Footer;
