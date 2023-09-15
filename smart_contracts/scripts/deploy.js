// Import necessary modules
const main = async () => {
  // Get the contract factory for the "Transactions" contract
  const transactionsFactory = await hre.ethers.getContractFactory("Transactions");

  // Deploy the "Transactions" contract
  const transactionsContract = await transactionsFactory.deploy();

  // Wait for the contract deployment to complete
  await transactionsContract.deployed();

  // Log the address of the deployed "Transactions" contract
  console.log("Transactions address: ", transactionsContract.address);
};

// Function to run the main logic and handle errors
const runMain = async () => {
  try {
    // Call the main function
    await main();
    
    // Exit the process with a success status code (0)
    process.exit(0);
  } catch (error) {
    // Handle and log any errors that occur
    console.error(error);
    
    // Exit the process with an error status code (1)
    process.exit(1);
  }
};

// Execute the runMain function to start the script
runMain();
