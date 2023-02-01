/* eslint-disable no-restricted-globals */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-else-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-multi-assign */
/* eslint-disable no-shadow */
/* eslint-disable max-len */
const { nanoid } = require('nanoid');
const books = require('./books');

const saveBook = (request, h) => {
  const bookForPost = [];
  const id = nanoid(16);
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;
  if (pageCount === readPage) {
    const finished = true;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const book = {
      id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt,
    };
    if (book.name !== undefined) {
      books.push(book);
    }
    bookForPost.push(book);
  } else if (pageCount > readPage) {
    const finished = false;
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const book = {
      id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt,
    };
    if (book.name !== undefined) {
      books.push(book);
    }
    bookForPost.push(book);
  }
  const [book] = bookForPost;
  const bookExist = books.filter((book) => book.id === id);
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  } if (book.name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  } if (bookExist) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getEntireBooks = (request, h) => {
  const { name, reading, finished } = request.query;
  const booksForGetMethod = [];
  for (let arrayItem of books) {
    const { id, name, publisher } = arrayItem;
    arrayItem = { id, name, publisher };
    booksForGetMethod.push(arrayItem);
  }
  if (name) {
    const filterName = booksForGetMethod.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
    if (filterName.length > 0) {
      const response = h.response({
        status: 'success',
        data: {
          books: filterName,
        },
      });
      return response;
    } else if (filterName) {
      const response = h.response({
        status: 'fail',
        message: 'Nama buku pada query tidak terdapat di bookshelf',
      });
      return response;
    }
  } else if (reading) {
    if (reading === '0') {
      const filterReading1 = books.filter((book) => book.reading === false);
      const bookList1 = [];
      for (let arrayItem1 of filterReading1) {
        const { id, name, publisher } = arrayItem1;
        arrayItem1 = { id, name, publisher };
        bookList1.push(arrayItem1);
      }
      const response = h.response({
        status: 'success',
        data: {
          books: bookList1,
        },
      });
      return response;
    } else if (reading === '1') {
      const filterReading2 = books.filter((book) => book.reading === true);
      const bookList2 = [];
      for (let arrayItem2 of filterReading2) {
        const { id, name, publisher } = arrayItem2;
        arrayItem2 = { id, name, publisher };
        bookList2.push(arrayItem2);
      }
      const response = h.response({
        status: 'success',
        data: {
          books: bookList2,
        },
      });
      return response;
    }
  } else if (finished) {
    if (finished === '0') {
      const filterFinished1 = books.filter((book) => book.finished === false);
      const bookList3 = [];
      for (let arrayItem3 of filterFinished1) {
        const { id, name, publisher } = arrayItem3;
        arrayItem3 = { id, name, publisher };
        bookList3.push(arrayItem3);
      }
      const response = h.response({
        status: 'success',
        data: {
          books: bookList3,
        },
      });
      return response;
    } else if (finished === '1') {
      const filterFinished2 = books.filter((book) => book.finished === true);
      const bookList4 = [];
      for (let arrayItem4 of filterFinished2) {
        const { id, name, publisher } = arrayItem4;
        arrayItem4 = { id, name, publisher };
        bookList4.push(arrayItem4);
      }
      const response = h.response({
        status: 'success',
        data: {
          books: bookList4,
        },
      });
      return response;
    }
  }
  const response = h.response({
    status: 'success',
    data: {
      books: booksForGetMethod,
    },
  });
  return response;
};

function getSpecifiedBook(request, h) {
  const { id } = request.params;
  const book = books.filter((book) => book.id === id)[0];
  if (book !== undefined) {
    const response = h.response = ({
      status: 'success',
      data: {
        book,
      },
    });
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
}

const editInfoBook = (request, h) => {
  const bookForPut = [];
  const { id } = request.params;
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;
  const updatedAt = new Date().toISOString();
  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };
    bookForPut.push(books[index]);
    const [book] = bookForPut;
    if (book.name === undefined) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      });
      response.code(400);
      return response;
    } if (readPage > pageCount) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
      });
      response.code(400);
      return response;
    }
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};
const deleteSpecifiedBook = (request, h) => {
  const { id } = request.params;
  const index = books.findIndex((book) => book.id === id);
  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};
module.exports = {
  saveBook, getEntireBooks, getSpecifiedBook, editInfoBook, deleteSpecifiedBook,
};
