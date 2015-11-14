import Book from './src/model/book';

Book.sync().then(console.log('books in sync'));
