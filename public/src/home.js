function totalBooksCount(books) {
  return books.length;
};

function totalAccountsCount(accounts) {
  return accounts.length;
};

function booksBorrowedCount(books) {
  const count = books.reduce((acc, book) => book.borrows[0].returned ? acc : acc + 1, 0);
  return count;
};

function firstFewEntries(list, targetLength) {
  return list.slice(0, targetLength);
}

function mostCommonGenres(books) {
//the result will be an array which we will need to mess with as we go
  let result = [];
//use map() to create a list of genres and sort alphabetically
  const genres = books.map((book) => book.genre);
  genres.sort((genreA, genreB) => genreA.toLowerCase() > genreB.toLowerCase() ? 1 : -1);

//iterate and tally each count
//have to use a for loop so I can have an index variable!
  for (let index = 0, count = 1; index < genres.length; index++) {
    if (genres[index] === genres[index+1]) {
      count++;
    } else {
//when the streak ends...
//create a new entry that is an object with name and count,
//push() that object to the results array,
//and reset the count
      const name = genres[index];
      const genre = { name, count };
      result.push(genre);
      count = 1;
    };
  };

//sort by most common and slice at 5 entries
  result.sort((genreA, genreB) => genreA.count < genreB.count ? 1 : -1);
  return firstFewEntries(result, 5);
};

function mostPopularBooks(books) {
//the result will be an array
  let result = [];
//use forEach() to push each book to the result array in its new object form
//the number of times a book has been checked out is AKA book.borrows.length
  books.forEach((book) => {
    const name = book.title;
    const count = book.borrows.length;
    const bookWithCount = { name, count };
    result.push(bookWithCount);
  });

//sort by most popular and slice at 5 entries
  result.sort((bookA, bookB) => bookA.count < bookB.count ? 1 : -1);
  return firstFewEntries(result, 5);
};

function mostPopularAuthors(books, authors) {
//follows the same structure as the last two functions
  let result = [];
  authors.forEach((author) => {
    const name = `${author.name.first} ${author.name.last}`;
    let count = 0;
//a for within a for here, as we search all the books for the current author
    books.forEach((book) => {
      if (book.authorId === author.id) count += book.borrows.length;
    });
    const authorWithCount = { name, count };
    result.push(authorWithCount);
  });

  result.sort((authorA, authorB) => authorA.count < authorB.count ? 1 : -1);
  return firstFewEntries(result, 5);
}

module.exports = {
  totalBooksCount,
  totalAccountsCount,
  booksBorrowedCount,
  mostCommonGenres,
  mostPopularBooks,
  mostPopularAuthors,
};
