
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  };

  info() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
  }
}

function toggleNewBookForm() {
  const form = document.querySelector('#new-book-form')
  const btn = document.querySelector('#add-book')
  form.classList.toggle('hidden')
  btn.classList.toggle('hidden')
}

function addBookToLibrary(e) {
  const { elements } = e.target;
  const properties = ["title", "author", "pages", "read"];
  const bookInfo = properties.map((p) => elements[p].value);
  // validate book here?
  let newBook = new Book(...bookInfo)
  library.push(newBook)
  updateStorage()
  clearForm()
  toggleNewBookForm()
  e.preventDefault();
}

function clearForm() {
  const formContents = document.getElementById('new-book-form').elements
  formContents.title.value = ""
  formContents.author.value = ""
  formContents.pages.valueAsNumber = ""
  formContents.read[0].checked = false
  formContents.read[1].checked = false
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
  newTitle.classList.add('title')
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
  newRead.textContent = book.read
  newRead.classList.add('read')
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
  book.read = (book.read == 'Yes') ? 'No' : 'Yes'
  updateStorage()
}

function deleteBook(index) {
  library.splice(index, 1)
  updateStorage()
}

function loadSampleLibrary() {
  let hobbit = new Book("The Hobbit", "J. R. R. Tolkein", 295, "No")
  let eden = new Book("East of Eden", "John Steinbeck", 601, 'Yes')
  let steppenwolf = new Book("Steppenwolf", "Herman Hesse", 237, 'Yes')
  let issueAtHand = new Book("The Issue at Hand", "Gil Fronsdal", 161, 'Yes')
  library.push(hobbit, eden, steppenwolf, issueAtHand)
  updateStorage()
}

function updateStorage() {
  localStorage.setItem('library', JSON.stringify(library))
  renderTable(library)
}

// Execution

let library = []

const newBookBtn = document.querySelector('#new-book')
newBookBtn.addEventListener('click', toggleNewBookForm)

const bookForm = document.getElementById("new-book-form");
bookForm.addEventListener("submit", addBookToLibrary);

if (!localStorage.getItem('library')) {
  const message = "No library was found in local storage. Load sample library?"
  if (confirm(message)) loadSampleLibrary()
} else {
  library = JSON.parse(localStorage.getItem('library'))
  renderTable(library)
}
