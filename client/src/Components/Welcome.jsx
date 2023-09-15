import React, { useContext } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { TransactionContext } from "../Context/Transactioncontext";
import { shortenAddress } from "../Utils/shortenAddress";
 
import {Loader } from "./Loader";

const CommonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

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

  const { connectWallet, currentAccount, formData, sendTransaction, handleChange , isLoading} = useContext(TransactionContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const { addressTo, amount, keyword, message } = formData;

    if (!addressTo || !amount || !keyword || !message) {
      // If any of the fields is missing, display an error message or alert.
      alert("Please fill out all fields.");
      return;
    }

    // All fields are filled out, proceed with the transaction.
    sendTransaction();
  };


  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4 ">
        <div className="flex flex-1 justify-start flex-col mf:mr-10">
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
            Transfer Cryptoassets<br /> across the Universe.
          </h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
            Step into the world of digital currencies. Simplify your cryptocurrency trading on WambCryp.
          </p>

          {!currentAccount && (
            <button
              type="button"
              onClick={connectWallet}
              className="relative inline-flex items-center justify-center p-4 px-12 py-3 overflow-hidden font-medium text-black transition duration-300 ease-out border-2 border-black rounded-full shadow-md group"
            >
              <span className="absolute inset-0 flex items-center justify-center w-full h-full text-black duration-300 -translate-x-full bg-white group-hover:translate-x-0 ease">
                <svg
                  class="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">
                ConnectWallet
              </span>
              <span class="relative invisible">Connect Wallet</span>
            </button>)}


          <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
            <div className={`rounded-tl-2xl ${CommonStyles}`}>
              Reliability
            </div>
            <div className={CommonStyles}>Security</div>
            <div className={`sm:rounded-tr-2xl ${CommonStyles}`}>
              Ethereum
            </div>
            <div className={`sm:rounded-bl-2xl ${CommonStyles}`}>
              Web 3.0
            </div>
            <div className={CommonStyles}>Low Fees</div>
            <div className={`rounded-br-2xl ${CommonStyles}`}>
              Blockchain
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
          <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism ">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-10 h-15 rounded-full border-2 border-black flex justify-start items-center">
                  <SiEthereum fontSize={20} color="#000" />
                </div>
                <BsInfoCircle fontSize={17} color="#000" />
              </div>
              <div>
                <p className="text-white font-light text-sm">
                  {shortenAddress(currentAccount)}
                </p>
                <p className="text-white font-semibold text-lg mt-1">
                  Ethereum
                </p>
              </div>
            </div>
          </div>
          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
            <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange} />
            <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} />
            <Input placeholder="Keyword (Gif)" name="keyword" type="text" handleChange={handleChange} />
            <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange} />
            <div className="h-[1px] w-full bg-gray-400 my-2" />
            <div className="h-[1px] w-full bg-gray-200 my-1" />

            {isLoading ? (
              <Loader />
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
              >
                Send now
              </button>)}
          </div>

        </div>
      </div>
    </div >
  )
}
export default Welcome;
