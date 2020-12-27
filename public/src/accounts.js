function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
};

function sortAccountsByLastName(accounts) {
  accounts.sort((accountA, accountB) =>
    accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1
  );
  return accounts;
};

function numberOfBorrows(account, books) {
//reduces the books array by finding the num of reservations by account for each book and accumulating
  const result = books.reduce((acc, book) => {
//filters each book's borrows array to include only reservations by account
    const borrowedByAccount = book.borrows.filter((borrow) => borrow.id === account.id);
//adds the length of that array to the accumulator
    return borrowedByAccount.length + acc;
  }, 0);
  return result;
}


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
