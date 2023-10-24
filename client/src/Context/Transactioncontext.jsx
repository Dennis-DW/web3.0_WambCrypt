import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../Utils/Constants";

export const TransactionContext = React.createContext();

const GAS_LIMIT = "0x5208";

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [currentTransactionCount, setCurrentTransactionCount] = useState(
    localStorage.getItem("transactionCount")
  );

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length) {
          setCurrentAccount(accounts[0]);
          getAllTransactions();
        } else {
          console.log("No accounts found");
        }
      } else {
        console.log("Ethereum is not present");
        // You can display a message to the user to install MetaMask or a suitable wallet.
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const checkIfTransactionsExist = async () => {
    try {
      if (window.ethereum) {
        const transactionsContract = getEthereumContract();
        const newTransactionCount =
          await transactionsContract.getTransactionCount();

        // Use try-catch when working with localStorage
        try {
          window.localStorage.setItem(
            "transactionCount",
            newTransactionCount.toString()
          );
          setCurrentTransactionCount(newTransactionCount.toString());
        } catch (localStorageError) {
          console.error("Error saving to localStorage:", localStorageError);
        }
      } else {
        console.log("Ethereum is not present");
        // Handle the case where Ethereum is not available.
      }
    } catch (error) {
      console.error("Error checking transactions:", error);
    }
  };
  const getEthereumContract = () => {
    if (window.ethereum) {
      // Check if the window.ethereum object is available (e.g., MetaMask is installed).
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // Create a Web3Provider instance using the window.ethereum object.

      const signer = provider.getSigner();
      // Get the signer for the current account from the provider.

      return new ethers.Contract(contractAddress, contractABI, signer);
      // Create an ethers.js Contract instance using the contract's ABI, address, and signer.
    } else {
      console.error("No ethereum object");
      // If the window.ethereum object is not available (Ethereum or Web3 provider is missing),
      // log an error message.

      // You may also want to handle this case differently, depending on your application's requirements.
      // Returning `null` is one way to handle it, but you might want to show a user-friendly message
      // or prompt the user to install a Web3 provider like MetaMask.
      return null;
    }
  };

  const getAllTransactions = async () => {
    const transactionsContract = getEthereumContract();
    if (transactionsContract) {
      try {
        const availableTransactions =
          await transactionsContract.getAllTransactions();
        const structuredTransactions = availableTransactions.map(
          (transaction) => ({
            addressTo: transaction.receiver,
            addressFrom: transaction.sender,
            timestamp: new Date(
              transaction.timestamp.toNumber() * 1000
            ).toLocaleString(),
            message: transaction.message,
            keyword: transaction.keyword,
            amount: parseInt(transaction.amount._hex) / 10 ** 18,
          })
        );
        setTransactions(structuredTransactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    }
  };

  const connectWallet = async () => {
    try {
      console.log("Attempting to connect wallet...");
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log("Connected accounts:", accounts);
        setCurrentAccount(accounts[0]);
        window.location.reload();
      } else {
        console.log("No ethereum object");
        // Handle the case where Ethereum is not available.
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const sendTransaction = async () => {
    try {
      if (window.ethereum) {
        // get the data from the form
        const { addressTo, amount, keyword, message } = formData;
        const transactionContract = getEthereumContract();

        if (transactionContract) {
          const parsedAmount = ethers.utils.parseEther(amount);

          // Send the Ethereum transaction
          const transactionHash = await window.ethereum.request({
            method: "eth_sendTransaction",
            params: [
              {
                from: currentAccount,
                to: addressTo,
                gas: GAS_LIMIT,
                value: parsedAmount.toHexString(),
              },
            ],
          });

          setIsLoading(true);
          console.log(`Loading - ${transactionHash}`);
          await transactionHash.wait();
          console.log(`Success - ${transactionHash}`);
          setIsLoading(false);

          const transactionsCount =
            await transactionContract.getTransactionCount();
          setCurrentTransactionCount(transactionsCount.toString());

          window.location.reload();
        }
      } else {
        console.log("No ethereum object");
        // Handle the case where Ethereum is not available.
      }
    } catch (error) {
      console.error("Error sending transaction:", error);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    checkIfTransactionsExist();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        formData,
        setFormData,
        handleChange,
        sendTransaction,
        isLoading,
        transactions,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
