
let library = []
const newBookBtn = document.querySelector('#new-book')
newBookBtn.addEventListener('click', displayNewBookForm)
const addBookBtn = document.querySelector('#add-book')
addBookBtn.addEventListener('click', addBookToLibrary)

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

function displayNewBookForm() {
  const form = document.querySelector('#new-book-form')
  const btn = document.querySelector('#add-book')
  form.classList.toggle('hidden')
  btn.classList.toggle('hidden')
}

function addBookToLibrary() {
  // TODO: Get user input
  let newInfo = document.getElementById('new-book-form')

  console.log(newInfo.elements)
  console.log(newInfo.elements.newPages.valueAsNumber)

  let newTitle = newInfo.elements.newTitle.value
  let newAuthor = newInfo.elements.newAuthor.value 
  let newPages = newInfo.elements.newPages.valueAsNumber 
  let newRead = newInfo.elements.newRead.checked
  let newBook = new Book(newTitle,newAuthor,newPages,newRead)
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
  for (let book of library) renderBook(book)
}

function renderBook(book) {
  // make new table row, add to table
  const table = document.querySelector('tbody');
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


