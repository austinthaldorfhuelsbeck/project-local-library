function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
};

function findBookById(books, id) {
  return books.find((book) => book.id === id);
};

function partitionBooksByBorrowedStatus(books) {
  const borrowedBooks = books.filter((book) => !book.borrows[0].returned);
  const returnedBooks = books.filter((book) => book.borrows[0].returned);
  const partitionedBooks = [borrowedBooks, returnedBooks];
  return partitionedBooks;
};

//borrowers is an array of objects
//book.borrows is an array to use as a template for map()
//borrow is the current individual borrow within the book.borrows array
//borrower is the account object corresponding to the borrow
//but it needs the borrow.returned boolean added on
function getBorrowersForBook(book, accounts) {
  const borrowers = book.borrows.map((borrow) => {
    const borrower = accounts.find((account) => account.id === borrow.id);
    return { ...borrower, ...borrow };
  });
  return borrowers.slice(0, 10);
};

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
