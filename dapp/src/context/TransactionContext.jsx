import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractAbi, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractAbi,
    signer
  );
  return transactionContract;
};

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState({
    address: "",
    balance: 0,
  });
  const [isLoading, setIsLoading] = useState(false);

  const sendTransaction = async (
    { addressTo, amount, keyword, message },
    onSuccess = (data) => {},
    onError = () => {}
  ) => {
    try {
      if (!ethereum) return alert("Please install metamask");
      let contract = getEthereumContract();
      const parsedAmount = ethers.utils.parseEther(amount);
      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount.address,
            to: addressTo,
            gas: "0x5208", // 21000 wei
            value: parsedAmount._hex,
          },
        ],
      });
      let savedTransaction = await contract.addToBlockchain(
        addressTo,
        parsedAmount,
        message,
        keyword
      );

      setIsLoading(true);
      await savedTransaction.wait();
      setIsLoading(false);
      onSuccess(savedTransaction);
    } catch (error) {
      console.log(error);
      onError();
      throw new Error(error);
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const accounts = await ethereum.request({ method: "eth_accounts" });
      // get eth balance
      const balance = await ethereum.request({
        method: "eth_getBalance",
        params: [accounts[0], "latest"],
      });

      if (accounts.length) {
        const ethBalance = ethers.utils.formatEther(balance);
        setCurrentAccount({
          address: accounts[0],
          balance: parseFloat(ethBalance).toFixed(4),
        });
      } else {
        return console.log("Please connect metamask");
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const account = await ethereum.request({ method: "eth_requestAccounts" });
      setCurrentAccount(account[0]);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  const getAllTransactions = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");
      setIsLoading(true);
      let contract = getEthereumContract();
      const transactions = await contract.getAllTransactions();
      setIsLoading(false);
      let lst = [];
      transactions.map((transaction) => {
        let obj = {
          sender: transaction.sender,
          receiver: transaction.receiver,
          amount: parseInt(transaction.amount._hex) / 10 ** 18,
          message: transaction.message,
          timestamp: new Date(
            transaction.timestamp.toNumber() * 1000
          ).toLocaleString(),
          keyword: transaction.keyword,
          url: transaction.url,
        };
        lst.push(obj);
      });

      return lst;
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        sendTransaction,
        getAllTransactions,
        isLoading,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
