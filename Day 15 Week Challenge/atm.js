const fs = require("fs");
const readline = require("readline");
const EventEmitter = require("events");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Load user data from JSON file
let users = loadUsersData();

// Sample transaction data
const transactions = [];

// Function to save users data to users.json file
function saveUsersData() {
  fs.writeFileSync("users.json", JSON.stringify(users, null, 2));
}

// Function to save transactions data to transactions.json file
function saveTransactionsData(accountID) {
  const transactions = viewTransactions(accountID);
  fs.writeFileSync("transactions.json", JSON.stringify(transactions, null, 2));
}

// Function to load users data from users.json file
function loadUsersData() {
  try {
    const usersData = fs.readFileSync("users.json");
    return JSON.parse(usersData);
  } catch (error) {
    console.error("Error loading user data:", error);
    return [];
  }
}

// Function to generate unique accountID
function generateAccountID() {
  return "ACC" + (Math.floor(Math.random() * 9000) + 1000); // Generates a 4-digit random number
}

// Function to generate PIN of four numbers
function generatePIN() {
  return Math.floor(1000 + Math.random() * 9000);
}

// Function to authenticate user
function authenticateUser(accountID, pin) {
  return users.find((user) => user.accountID === accountID && user.pin === pin);
}

// Function to check balance
function checkBalance(accountID) {
  const user = users.find((user) => user.accountID === accountID);
  return user ? user.balance : null;
}

// Function to deposit money
function deposit(accountID, amount) {
  const user = users.find((user) => user.accountID === accountID);
  if (user) {
    user.balance += amount;
    user.transactions.push({ type: "deposit", amount, timestamp: new Date() });
    saveUsersData();
    return true;
  }
  return false;
}

// Function to withdraw money
function withdraw(accountID, amount) {
  const user = users.find((user) => user.accountID === accountID);
  if (user && user.balance >= amount) {
    user.balance -= amount;
    user.transactions.push({
      type: "withdrawal",
      amount,
      timestamp: new Date(),
    });
    saveUsersData();
    return true;
  }
  return false;
}

// Function to view transaction history
function viewTransactions(accountID) {
  const user = users.find((user) => user.accountID === accountID);
  return user ? user.transactions : [];
}

// Event emitter
const eventEmitter = new EventEmitter();

// Event listener for login
eventEmitter.on("login", (accountID, pin) => {
  const user = authenticateUser(accountID, pin);
  if (user) {
    console.log(`Welcome, ${user.name}!`);
    eventEmitter.emit("loggedIn", user);
  } else {
    console.log("Invalid accountID or PIN. Please try again.");
  }
});

// Event listener for check balance
eventEmitter.on("checkBalance", (accountID) => {
  const balance = checkBalance(accountID);
  console.log(`Your current balance is: $${balance}`);
});

// Event listener for deposit
eventEmitter.on("deposit", (accountID, amount) => {
  if (deposit(accountID, amount)) {
    console.log(`$${amount} has been deposited into your account.`);
  } else {
    console.log("Failed to deposit money.");
  }
});

// Event listener for withdraw
eventEmitter.on("withdraw", (accountID, amount) => {
  if (withdraw(accountID, amount)) {
    console.log(`$${amount} has been withdrawn from your account.`);
  } else {
    console.log("Insufficient funds or invalid account.");
  }
});

// Event listener for view transactions
eventEmitter.on("viewTransactions", (accountID) => {
  const transactions = viewTransactions(accountID);
  console.log("Transaction History:");
  console.log(transactions);
});

// Event listener for add new user
eventEmitter.on("addUser", (name) => {
  const pin = generatePIN().toString(); // Generate PIN of four numbers
  const accountID = generateAccountID(); // Generate unique accountID
  const newUser = {
    accountID,
    name,
    pin,
    balance: 0,
    transactions: [],
  };
  users.push(newUser);
  saveUsersData();
  console.log(`New user created with accountID: ${accountID} and PIN: ${pin}`);
});

// Main function
function main() {
  // Function to display initial menu
  function showInitialMenu() {
    console.log("\nWelcome! Please select an option:");
    console.log("1. Login");
    console.log("2. Add New User");
    console.log("3. Exit");
    rl.question("Enter your choice: ", (choice) => {
      handleInitialChoice(parseInt(choice));
    });
  }

  // Function to handle initial user choice
  function handleInitialChoice(choice) {
    switch (choice) {
      case 1:
        login();
        break;
      case 2:
        rl.question("Enter your name : ", (name) => {
          eventEmitter.emit("addUser", name);
          login();
        });
        break;
      case 3:
        console.log("Exiting...");
        rl.close();
        break;
      default:
        console.log("Invalid choice. Please try again.");
        showInitialMenu();
    }
  }
  console.log("Welcome to the ATM management system.");

  showInitialMenu();

  // Function to handle login
  function login() {
    rl.question("Enter your account ID: ", (accountID) => {
      rl.question("Enter your PIN: ", (pin) => {
        eventEmitter.emit("login", accountID, pin);
      });
    });
  }

  // Function to display menu
  function showMenu() {
    console.log("\nMenu:");
    console.log("1. Check Balance");
    console.log("2. Deposit");
    console.log("3. Withdraw");
    console.log("4. View Transactions");
    console.log("5. Save Transactions in a file");
    console.log("6. Back to the menu");
    rl.question("Enter your choice: ", (choice) => {
      handleChoice(parseInt(choice));
    });
  }

  // Function to handle user choice
  function handleChoice(choice) {
    switch (choice) {
      case 1:
        eventEmitter.emit("checkBalance", currentUser.accountID);
        showMenu();
        break;
      case 2:
        rl.question("Enter amount to deposit: ", (amount) => {
          eventEmitter.emit(
            "deposit",
            currentUser.accountID,
            parseFloat(amount)
          );
          showMenu();
        });
        break;
      case 3:
        rl.question("Enter amount to withdraw: ", (amount) => {
          eventEmitter.emit(
            "withdraw",
            currentUser.accountID,
            parseFloat(amount)
          );
          showMenu();
        });
        break;
      case 4:
        eventEmitter.emit("viewTransactions", currentUser.accountID);
        showMenu();
        break;
      case 5:
        saveTransactionsData(currentUser.accountID);
        showMenu();
        break;
      case 6:
        console.log("Exiting...");
        showInitialMenu();
        break;
      default:
        console.log("Invalid choice. Please try again.");
        showMenu();
    }
  }

  let currentUser;
  eventEmitter.on("loggedIn", (user) => {
    currentUser = user;
    showMenu();
  });

  login();
}

main();
