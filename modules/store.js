export default class Store {
  // getting books from LS
  static getBooks() {
    let books;
    if (localStorage.getItem('Books') !== null) {
      books = JSON.parse(localStorage.getItem('Books'));
    } else {
      books = [];
    }
    return books;
  }

  // adding books to local storage
  static addBook(book) {
    const storedBooks = this.getBooks();
    storedBooks.push(book);
    localStorage.setItem('Books', JSON.stringify(storedBooks));
  }

  // removing books from local storage
  static removeBook(ID) {
    const storedBooks = this.getBooks();
    const idInNum = Number(ID);
    storedBooks.forEach((storedBook, index) => {
      if (storedBook.ID === idInNum) {
        storedBooks.splice(index, 1);
      }
    });
    localStorage.setItem('Books', JSON.stringify(storedBooks));
  }
}