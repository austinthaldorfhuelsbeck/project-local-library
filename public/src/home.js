function totalBooksCount(books) {
  const count = books.reduce((acc, book) => acc + 1, 0);
  return count;
};

function totalAccountsCount(accounts) {
  const count = accounts.reduce((acc, account) => acc + 1, 0);
  return count;
};

function booksBorrowedCount(books) {
  const count = books.reduce((acc, book) => book.borrows[0].returned ? acc : acc + 1, 0);
  return count;
};

function mostCommonGenres(books) {
//the result will be an array which we will need to mess with as we go
  let result = [];
//use map() to create a list of genres and sort alphabetically
  let genres = books.map((book) => book.genre);
  genres.sort((a, b) => a.toLowerCase() > b.toLowerCase() ? 1 : -1);

//iterate and tally each count
//have to use a for loop so I can have an index variable!
  for (let i = 0, count = 1; i < genres.length; i++) {
    if (genres[i] === genres[i+1]) {
      count++;
    } else {
//when the streak ends...
//create a new entry that is an object with name and count,
//push() that object to the results array,
//and reset the count
      let name = genres[i];
      let genre = { name, count };
      result.push(genre);
      count = 1;
    };
  };

//sort by most common and slice at 5 entries
  result.sort((a, b) => a.count < b.count ? 1 : -1);
  return result.slice(0, 5);
};

function mostPopularBooks(books) {
//the result will be an array
  let result = [];
//use forEach() to push each book to the result array in its new object form
//the number of times a book has been checked out is AKA book.borrows.length
  books.forEach((book) => {
    let name = book.title;
    let count = book.borrows.length;
    let bookWithCount = { name, count };
    result.push(bookWithCount);
  });

//sort by most popular and slice at 5 entries
  result.sort((a, b) => a.count < b.count ? 1 : -1);
  return result.slice(0, 5);
};

function mostPopularAuthors(books, authors) {
//follows the same structure as the last two functions
  let result = [];
  authors.forEach((author) => {
    let name = `${author.name.first} ${author.name.last}`;
    let count = 0;
//a for within a for here, as we search all the books for the current author
    books.forEach((book) => {
      if (book.authorId === author.id) count += book.borrows.length;
    });
    let authorWithCount = { name, count };
    result.push(authorWithCount);
  });

  result.sort((a, b) => a.count < b.count ? 1 : -1);
  return result.slice(0, 5);
}

module.exports = {
  totalBooksCount,
  totalAccountsCount,
  booksBorrowedCount,
  mostCommonGenres,
  mostPopularBooks,
  mostPopularAuthors,
};
