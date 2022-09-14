(function () {
  document
    .querySelector('form')
    .reset()
  const inputs = document.querySelectorAll('input');
  inputs.forEach(input => {
    input.addEventListener('change', e => {
      if (e.target.value !== '') {
        e
          .target
          .nextElementSibling
          .classList
          .add('input--valid')
      }
    })
  });

  let library = [
    {
      title: "Halo",
      author: 'Erick',
      pages: 300,
      read: true,
      id: Date.now()
    }, {
      title: "Halo 2",
      author: 'Erick',
      pages: 300,
      read: true,
      id: Date.now()
    }
  ];

  function Book(title, author, pages, read, id) {
    this.title = String(title);
    this.author = String(author);
    this.pages = Number(pages);
    this.read = Boolean(read);
    this.id = id;
  }

  function addBook(e) {
    e.preventDefault()
    const title = document.querySelector('#title');
    const author = document.querySelector('#author');
    const pages = document.querySelector('#pages');
    const read = document.querySelector('#read');

    const isEmpty = [title, author, pages].every(input => input.value === '');
    if (isEmpty) {
      console.log("campos vacios")
    } else {
      const book = new Book(title.value, author.value, pages.value, read.checked, Date.now())
      library = [
        ...library,
        book
      ];
      showLibrary()
      e
        .target
        .reset()
    }

  }

  function showLibrary() {
    cleanHtmlLibrary()
    const tbody = document.querySelector('.books .books__body');


    library.forEach(book => {

          // Svg Book completed
    const bookComplete = document.createElement('img');
    bookComplete.src = "./img/bookComplete.svg";
    bookComplete
      .classList
      .add('book__img');

    bookComplete.dataset.completed = true;
    bookComplete.onclick = setComplete;

    // Svg Book pending to read
    const pendingBook = document.createElement('img');
    pendingBook.src = "./img/book.svg";
    pendingBook
      .classList
      .add('book__img');

    pendingBook.dataset.completed = false;
    pendingBook.onclick = setComplete;

      const row = document.createElement('tr');
      row.dataset.id = book.id;

      const tdTitle = document.createElement('td');
      tdTitle
        .classList
        .add('books__item');
      tdTitle.textContent = book.title

      const tdAuthor = document.createElement('td');
      tdAuthor
        .classList
        .add('books__item');
      tdAuthor.textContent = book.author

      const tdPages = document.createElement('td');
      tdPages
        .classList
        .add('books__item');
      tdPages.textContent = book.pages

      const tdOptions = document.createElement('td');
      tdOptions
        .classList
        .add('books__item');

      tdOptions.innerHTML = `
      <button id="book__delete" value="${book.id}" class="button button--primary" type="button">Eliminar</button>
      `;

      const tdStatus = document.createElement('td');
      tdStatus
        .classList
        .add('books__item');

      tdStatus
        .classList
        .add('books__item');
      console.log(book.read)
     // debugger
      if (book.read) {
        tdStatus.append(bookComplete);
        console.log("libro completa")
      } else {
        tdStatus.append(pendingBook)
        console.log("libro incompleta")

      }

      row.append(tdTitle, tdAuthor, tdPages, tdStatus, tdOptions)
      tbody.appendChild(row);
    })

  }

  function setComplete(e) {
    const id = e.target.parentElement.parentElement.dataset.id;

    library = library.map(book => {
      if (book.id == id) {
        book.read = !book.read
        return book
      }
      return book
    })
    const state = e.target.dataset.completed;
    //console.log( state)

    if (state === 'true') {
      console.log(e.target.dataset.completed, 'Data set es', true)

      e.target.dataset.completed = false
      e.target.src = "./img/book.svg";
    } else if (state === 'false') {
      console.log(e.target.dataset.completed, 'Data set es', false)

      e.target.dataset.completed = true
      e.target.src = "./img/bookComplete.svg";
    } else {
      console.log("este")
    }
  }

  function cleanHtmlLibrary() {
    const tbody = document.querySelector('.books tbody');
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
  }

  function eventListener() {
    const form = document.querySelector('#form__addBook');
    form.addEventListener('submit', e => addBook(e))
    showLibrary()
  }
  eventListener()
})()