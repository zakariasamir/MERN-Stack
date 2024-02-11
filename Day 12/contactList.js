const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let Contacts = [];

async function addContact() {
  const name = await askQuestion("Enter Name: ");
  const phoneNumber = await askQuestion("Enter phone number: ");
  Contacts.push({ name, phoneNumber });
  console.log("Contact added successfully.");
}

async function viewContacts() {
  if (Contacts.length === 0) {
    console.log("There is no contact to show!");
  } else {
    console.log("View Contacts");
    Contacts.forEach((contact) => {
      console.log(`Name: ${contact.name}, Phone: ${contact.phoneNumber}`);
    });
  }
}

async function searchContacts() {
  const name = await askQuestion("Enter name to search: ");
  const foundContact = Contacts.find((contact) => contact.name === name);
  if (foundContact) {
    console.log(
      `Name: ${foundContact.name}, Phone: ${foundContact.phoneNumber}\n`
    );
  } else {
    console.log("Contact not found.\n");
  }
}

async function askQuestion(question) {
  return new Promise((resolve, reject) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

async function showMenu() {
  let choice;
  while (true) {
    console.log("Contact List");
    console.log("To Add Contact write 1");
    console.log("To View all contacts write 2");
    console.log("To Search for a contact write 3");
    console.log("To Exit write 4");

    choice = await askQuestion("Write Your Answer?");
    
    if (choice === "1") {
      await addContact();
    } else if (choice === "2") {
      await viewContacts();
    } else if (choice === "3") {
      await searchContacts();
    } else if (choice === "4") {
      rl.close();
      break;
    } else {
      console.log("Invalid choice. Please try again.\n");
    }
  }
}

console.log("Welcome to the Contact Manager App!\n");
(async () => {
  await showMenu();
})();
