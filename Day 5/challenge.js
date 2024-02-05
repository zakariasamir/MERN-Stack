const books = require("./books.json");

console.log("priceOfBook");
function priceOfBook(bookName) {
  // write your code here
  for (let i = 0; i < books.length; i++) {
    if (bookName === books[i].title) {
      return books[i].price;
    }
  }
  return null;
}
console.log(priceOfBook("The Alchemist"));

console.log("affordableBooks");
function affordableBooks(budget) {
  // write your code here
  const affordable = [];
  let affordableIndex = 0;
  for (let i = 0; i < books.length; i++) {
    if (books[i].price <= budget) {
      affordable[affordableIndex] = books[i];
      affordableIndex++;
    }
  }
  return affordable;
}
console.log(affordableBooks(10));

console.log("findBookByGenre");
function findBookByGenre(genre) {
  // write your code here
  const genreBooks = [];
  let genreIndex = 0;
  for (let i = 0; i < books.length; i++) {
    for (let j = 0; j < books[i].genres.length; j++) {
      if (books[i].genres[j] === genre) {
        genreBooks[genreIndex] = books[i];
        genreIndex++;
      }
    }
  }
  return genreBooks;
}
console.log(findBookByGenre("Fiction"));

console.log("groupByGenre");
function groupByGenre() {
  // write your code here

  // Initialize an empty object to store grouped books by genre
  const groupedBooks = {};

  // Iterate through each book in the 'books' array
  for (let i = 0; i < books.length; i++) {
    // Retrieve the genres array for the current book
    const genres = books[i].genres;

    // Iterate through each genre in the genres array
    for (let j = 0; j < genres.length; j++) {
      // Retrieve the current genre
      const genre = genres[j];

      // Check if the genre is not already a key in 'groupedBooks'
      if (!groupedBooks[genre]) {
        // If not, create an empty array as the value for that genre
        groupedBooks[genre] = [];
      }

      // Add the current book to the array corresponding to its genre
      groupedBooks[genre][groupedBooks[genre].length] = books[i];
    }
  }

  // Return the object containing books grouped by genre
  return groupedBooks;
}

console.log(groupByGenre());

console.log("sortBooksByPrice");
function sortBooksByPrice() {
  // write your code here

  // Create a copy of the 'books' array to avoid modifying the original array
  const sortedBooks = [];
  for (let i = 0; i < books.length; i++) {
    sortedBooks[i] = books[i];
  }

  // Bubble sort algorithm to sort 'sortedBooks' based on book prices
  for (let i = 0; i < sortedBooks.length - 1; i++) {
    for (let j = 0; j < sortedBooks.length - i - 1; j++) {
      // Compare adjacent book prices and swap them if necessary
      if (sortedBooks[j].price > sortedBooks[j + 1].price) {
        const temp = sortedBooks[j];
        sortedBooks[j] = sortedBooks[j + 1];
        sortedBooks[j + 1] = temp;
      }
    }
  }

  // Return the sorted array of books
  return sortedBooks;
}
console.log(sortBooksByPrice());
(function main() {
  try {
    if (priceOfBook("The Alchemist") !== 9.49) {
      throw new Error("priceOfBook is not working properly.");
    }
    if (affordableBooks(10).length !== 6) {
      throw new Error("affordableBooks is not working properly.");
    }
    if (findBookByGenre("Fiction").length !== 7) {
      throw new Error("findBookByGenre is not working properly.");
    }
    if (Object.keys(groupByGenre()).length !== 30) {
      throw new Error("groupByGenre is not working properly.");
    }
    if (sortBooksByPrice()[0].price !== 5.99) {
      throw new Error("sortBooksByPrice is not working properly.");
    }
    console.log("All tests passed successfully.");
  } catch (error) {
    console.log(error);
  }
})();