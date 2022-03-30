import React, { useContext, useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import Loader from "./Loader";
import { TransactionContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";

const companyCommonStyles =
  "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-600 text-sm font-light text-white";

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);

const Welcome = () => {
  const context = useContext(TransactionContext);
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    context.sendTransaction(
      formData,
      (data) => {
        setFormData({
          addressTo: "",
          amount: "",
          keyword: "",
          message: "",
        });
      },
      () => {
        alert("Something went wrong");
      }
    );
  };

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex w-full mf:flex-row flex-col items-start justify-between sm:justify-center sm:items-center md:justify-center md:items-center md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
            Send Crypto <br /> across the world
          </h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
            Explore the crypto world. Buy and sell cryptocurrencies easily on
            Krypt.
          </p>

          {!context?.currentAccount?.address && (
            <button
              className="rounded-full text-base font-semibold bg-[#2952e3] py-2 px-7 hover:bg-[#2546bd] text-white mt-4 w-full"
              onClick={() => {
                context?.connectWallet();
              }}
            >
              Connect your MetaMask wallet
            </button>
          )}

          <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
            <div className={`rounded-tl-2xl ${companyCommonStyles}`}>
              Reliability
            </div>
            <div className={companyCommonStyles}>Security</div>
            <div className={`sm:rounded-tr-2xl ${companyCommonStyles}`}>
              Ethereum
            </div>
            <div className={`sm:rounded-bl-2xl ${companyCommonStyles}`}>
              Web 3.0
            </div>
            <div className={companyCommonStyles}>Low Fees</div>
            <div className={`rounded-br-2xl ${companyCommonStyles}`}>
              Blockchain
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 mf:items-end mf:justify-end md:justify-center md:items-center sm:justify-center sm:items-center w-full mf:mt-0 mt-10">
          <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-96 w-full my-5 eth-card .white-glassmorphism ">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                  <SiEthereum fontSize={21} color="#fff" />
                </div>
                <BsInfoCircle fontSize={17} color="#fff" />
              </div>
              <div>
                <p className="text-white font-light text-sm">
                  {shortenAddress(context?.currentAccount.address)}
                </p>
                <div className="flex flex-row justify-between">
                  <p className="text-white font-semibold text-lg mt-1">
                    Ethereum
                  </p>
                  <p className="text-white font-semibold text-lg mt-1 float-right">
                    Balance: {context?.currentAccount?.balance} ETH
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
            <Input
              placeholder="Address To"
              name="addressTo"
              value={formData.addressTo}
              type="text"
              handleChange={(e, name) => {
                setFormData({ ...formData, addressTo: e.target.value });
              }}
            />
            <Input
              placeholder="Amount (ETH)"
              name="amount"
              type="number"
              value={formData.amount}
              handleChange={(e, name) => {
                setFormData({ ...formData, amount: e.target.value });
              }}
            />
            <Input
              placeholder="Keyword (Gif)"
              name="keyword"
              type="text"
              value={formData.keyword}
              handleChange={(e, name) => {
                setFormData({ ...formData, keyword: e.target.value });
              }}
            />
            <Input
              placeholder="Enter Message"
              name="message"
              type="text"
              value={formData.message}
              handleChange={(e, name) => {
                setFormData({ ...formData, message: e.target.value });
              }}
            />

            <div className="h-[0.1px] w-full bg-[#3d4f7c] my-2" />

            {context?.isLoading ? (
              <button
                type="button"
                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
              >
                Transaction in Progress...
              </button>
            ) : (
              <button
                type="button"
                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                onClick={handleSubmit}
              >
                Send ETH
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
