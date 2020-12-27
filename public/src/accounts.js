function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
};

function sortAccountsByLastName(accounts) {
  accounts.sort((accountA, accountB) =>
    accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1
  );
  return accounts;
};

function numberOfBorrows(account, books) {}

/*
// use reduce() to turn the book's borrow array into a sum of matches
function numberOfBorrows(account, books) {
  const id = account.id;
  let borrows = 0;
  borrows = book.reduce((acc, book) =>
    // if the current book object's borrows keys include id, increment acc
    if (Object.keys(book.borrows).includes(id)) acc++
  );
  return borrows;
};
*/


// uses filter() to build a new list of books from the books array
// the book will be currently checked out by the account if the most recent borrows entry's id === account.id
// uses forEach() to embed the author object inside
function booksInPossession(account, books, authors) {
  let filteredBooks = books.filter((book) => 
    book.borrows[0].id === account.id
  );
  filteredBooks.forEach((book) => {
    book.author = authors.find((author) => author.id === book.authorId)
  });
  return filteredBooks;
};

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  numberOfBorrows,
  booksInPossession,
};
