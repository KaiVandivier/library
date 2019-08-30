// TODO: Make it look pretty
// TODO: Store library values offline

let library = []

const newBookBtn = document.querySelector('#new-book')
newBookBtn.addEventListener('click', displayNewBookForm)

const addBookBtn = document.querySelector('#add-book')
addBookBtn.addEventListener('click', addBookToLibrary)

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
}

Book.prototype.info = function () {
  return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}` 
}

function displayNewBookForm() {
  const form = document.querySelector('#new-book-form')
  const btn = document.querySelector('#add-book')
  form.classList.toggle(  // make new table row, add to table
    // make new table row, add to table
    // make new table row, add to table
    // make new table row, add to table
    // make new table row, add to table
    // make new table row, add to table
    // make new table row, add to table
    'hidden')
  btn.classList.toggle('hidden')
}

function addBookToLibrary(newBook = null) {
  // TODO: Validate form input
  if (!newBook) {
    let newInfo = document.getElementById('new-book-form')
    let newTitle = newInfo.elements.newTitle.value
    let newAuthor = newInfo.elements.newAuthor.value 
    let newPages = newInfo.elements.newPages.valueAsNumber 
    let newRead = newInfo.elements.newRead.checked
    newBook = new Book(newTitle, newAuthor, newPages, newRead)
  }
  library.push(newBook)
  renderBook(newBook)
  clearForm()
}

function clearForm() {
  let formInfo = document.getElementById('new-book-form')

  formInfo.elements.newTitle.value = ""
  formInfo.elements.newAuthor.value = ""
  formInfo.elements.newPages.value = ""
  formInfo.elements.newRead.checked = false
  formInfo.elements.no.checked = false
}

function renderTable(library) {
  const table = document.querySelector('tbody');
  const rows = table.querySelectorAll('tr')
  rows.forEach((row) => table.removeChild(row)) //clear table
  for (let book of library) renderBook(book)
}

function renderBook(book) {
  const table = document.querySelector('tbody');
  const newRow = document.createElement('tr')
  table.appendChild(newRow)
  addTitleCell(book, newRow)
  addAuthorCell(book, newRow)
  addPagesCell(book, newRow)
  addReadCell(book, newRow)
  addDeleteCell(book, newRow)
}

function addTitleCell(book, newRow) {
  const newTitle = document.createElement('td')
  newTitle.textContent = book.title
  newRow.appendChild(newTitle)
}

function addAuthorCell(book, newRow) {
  const newAuthor = document.createElement('td')
  newAuthor.textContent = book.author
  newRow.appendChild(newAuthor)
}

function addPagesCell(book, newRow) {
  const newPages = document.createElement('td')
  newPages.textContent = book.pages
  newRow.appendChild(newPages)
}

function addReadCell(book, newRow) {
  const newRead = document.createElement('td')
  newRead.textContent = (book.read) ? 'has been read' : 'not read yet'
  newRow.appendChild(newRead)
  newRead.setAttribute('data-index', (library.indexOf(book)).toString())
  newRead.addEventListener('click', (e) => toggleRead(parseInt(e.target.getAttribute('data-index'))))
}

function addDeleteCell(book, newRow) {
  const del = document.createElement('td')
  newRow.appendChild(del)
  const delBtn = document.createElement('button')
  delBtn.textContent = "Delete"
  delBtn.classList.add('delete')
  delBtn.setAttribute('data-index', (library.indexOf(book)).toString())
  del.appendChild(delBtn)
  delBtn.addEventListener('click', (e) => deleteBook(parseInt(e.target.getAttribute('data-index'))))
}

function toggleRead(index) {
  let book = library[index]
  book.read = !book.read
  renderTable(library)
}

function deleteBook(index) {
  library.splice(index, 1)
  renderTable(library)
}

/***  Testing   ****/

// set up some books manually *****
let hobbit = new Book("The Hobbit", "J. R. R. Tolkein", 295, false)
let eden = new Book("East of Eden", "John Steinbeck", 512, true)
let steppenwolf = new Book("Steppenwolf", "Herman Hesse", 254, true)
let issueAtHand = new Book("The Issue at Hand", "Gil Fronsdal", 154, true)
addBookToLibrary(hobbit)
addBookToLibrary(eden)
addBookToLibrary(steppenwolf)
addBookToLibrary(issueAtHand)

// test functions *****
// renderTable(library)
