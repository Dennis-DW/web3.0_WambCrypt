import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../Utils/Constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;
const GAS_LIMIT = "0x5208";

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    // console.log({
    //     provider,
    //     signer,
    //     transactionContract,
    // });
    return transactionContract;
}

export const TransactionProvider = ({ children }) => {

    const [currentAccount, setCurrentAccount] = useState("");
    const [formData, setformData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
    const [transactions, setTransactions] = useState([]);


    const handleChange = (e, name) => {
        setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
    };

    const getAllTransactions = async () => {
        try {
            if (!ethereum) {
                console.log("Ethereum is not present");
                return;
            }

            const transactionsContract = getEthereumContract();
            const availableTransactions = await transactionsContract.getAllTransactions();

            const structuredTransactions = availableTransactions.map((transaction) => ({
                addressTo: transaction.receiver,
                addressFrom: transaction.sender,
                timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                message: transaction.message,
                keyword: transaction.keyword,
                amount: parseInt(transaction.amount._hex) / (10 ** 18)
            }));
            console.log(structuredTransactions);
            setTransactions(structuredTransactions);
        } catch (error) {
            console.error("Error fetching transactions:", error);
        }
    };


    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");

            const accounts = await ethereum.request({ method: "eth_accounts" });

            if (accounts.length) {
                setCurrentAccount(accounts[0]);

                getAllTransactions();

            } else {
                console.log("No accounts found");
            }
        } catch (error) {
            console.log(error);
        }
    };



    const checkIfTransactionsExists = async () => {
        try {
            if (!ethereum) {
                console.log("Ethereum is not present");
                return;
            }

            const transactionsContract = getEthereumContract();
            const currentTransactionCount = await transactionsContract.getTransactionCount();

            // Use try-catch when working with localStorage
            try {
                window.localStorage.setItem("transactionCount", transactionCount);
            } catch (localStorageError) {
                console.error("Error saving to localStorage:", localStorageError);
            }
        } catch (error) {
            console.error("Error checking transactions:", error);
            throw new Error("No ethereum object");
        }
    };

    const connectWallet = async () => {
        try {
            console.log("Attempting to connect wallet...");
            if (!ethereum) {
                console.log("No ethereum object");
                return alert("Please install MetaMask.");
            }
    
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            console.log("Connected accounts:", accounts);
    
            setCurrentAccount(accounts[0]);
            window.location.reload();
        } catch (error) {
            console.error("Error connecting wallet:", error);
            throw new Error("No ethereum object");
        }
    };
    

    const sendTransaction = async () => {
        try {
            if (!ethereum) return alert("Please install MetaMask.");
            // get the data from form
            const { addressTo, amount, keyword, message } = formData;
            const transactionContract = getEthereumContract(); // Use the function to obtain the contract instance
            const parsedAmount = ethers.utils.parseEther(amount);

            // Send the Ethereum transaction
            const transactionHash = await ethereum.request({
                method: "eth_sendTransaction",
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: "0x5208",
                    value: parsedAmount._hex,
                }],
            });

            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            console.log(`Success - ${transactionHash.hash}`);
            setIsLoading(false);

            const transactionsCount = await transactionContract.getTransactionCount();
            setTransactionCount(transactionsCount.toNumber());

            window.location.reload();
        } catch (error) {
            console.error("Error sending transaction:", error);
            throw new Error("No ethereum object");
        }
    };



    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionsExists();
    }, []);



    return (

        <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, setformData, handleChange, sendTransaction, isLoading, transactions }}>
            {children}
        </TransactionContext.Provider >
    )
};
