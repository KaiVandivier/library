
let library = []

// "Constructor"
function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = (read) ? 'has been read' : 'not read yet'
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}` 
}

function addBookToLibray() {
  // TODO: Get user input
  let newBook = new Book("a","b","c",false)
  library.push(newBook)
}

function renderTable(library) {
  const table = document.querySelector('tbody');
  for (let book of library) {
    renderBook(book, table)
  }
}

function renderBook(book, table) {
  // make new table row, add to table
  const newRow = document.createElement('tr')
  table.appendChild(newRow)

  // make new table cells, add to row
  const newTitle = document.createElement('td')
  const newAuthor = document.createElement('td')
  const newPages = document.createElement('td')
  const newRead = document.createElement('td')
  newTitle.textContent = book.title
  newAuthor.textContent = book.author
  newPages.textContent = book.pages
  newRead.textContent = book.read
  newRow.appendChild(newTitle)
  newRow.appendChild(newAuthor)
  newRow.appendChild(newPages)
  newRow.appendChild(newRead)
}

/***  Testing   ****/

// set up some books manually *****
let hobbit = new Book("The Hobbit", "J. R. R. Tolkein", 295, false)
let eden = new Book("East of Eden", "John Steinbeck", 512, true)
let steppenwolf = new Book("Steppenwolf", "Herman Hesse", 254, true)
let issueAtHand = new Book("The Issue at Hand", "Gil Fronsdal", 154, true)
library.push(hobbit, eden, steppenwolf, issueAtHand)

// test functions *****
renderTable(library)


