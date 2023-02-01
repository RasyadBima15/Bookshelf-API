const {
  saveBook, getEntireBooks, getSpecifiedBook, editInfoBook, deleteSpecifiedBook,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: saveBook,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getEntireBooks,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getSpecifiedBook,
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: editInfoBook,
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteSpecifiedBook,
  },
];
module.exports = routes;
