// SPDX-License-Identifier: UNLICENSED

// Solidity version to be used for compilation
pragma solidity ^0.8.0;

// Importing the Hardhat console library for debugging
import "hardhat/console.sol";

// Defining the Transactions contract
contract Transactions {
    // Counter for the number of transactions
    uint256 transactionCount;

    // Event emitted when a transfer occurs
    event Transfer(
        address from,
        address receiver,
        uint amount,
        string message,
        uint256 timestamp,
        string keyword
    );
  
    // Struct to represent a transaction
    struct TransferStruct {
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    // Array to store transaction data
    TransferStruct[] transactions;

    // Function to add a new transaction to the blockchain
    function addToBlockchain(
        address payable receiver,
        uint amount,
        string memory message,
        string memory keyword
    ) public {
        // Increment the transaction count
        transactionCount += 1;

        // Create a new transaction struct and add it to the transactions array
        transactions.push(
            TransferStruct(
                msg.sender,
                receiver,
                amount,
                message,
                block.timestamp,
                keyword
            )
        );

        // Emit the Transfer event to log the transaction
        emit Transfer(
            msg.sender,
            receiver,
            amount,
            message,
            block.timestamp,
            keyword
        );
    }

    // Function to retrieve all transactions
    function getAllTransactions() public view returns (TransferStruct[] memory) {
        return transactions;
    }

    // Function to get the total transaction count
    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }
}
