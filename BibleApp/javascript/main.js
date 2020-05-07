
const bibleBookList = document.querySelector(`#book-list`);
const breadcrumbs = document.querySelector(`#breadcrumbs`);

let bookHTML = ``;

getBooks(VERSION).then((bookList) => {
  bookHTML += `<ul>`;
  for (let book of bookList) {
    bookHTML += `<li><a href="libro.html?book=${book.id}"> ${book.name} </a></li>`;
  }
  bookHTML += `</ul>`;
  bibleBookList.innerHTML = bookHTML;
});

document.querySelector(`#viewing`).innerHTML = `Inicio`;
const breadcrumbsHTML = `
  <ul>
    <li><a href="#">Inicio</a></li>
  </ul>
`;
breadcrumbs.innerHTML = breadcrumbsHTML;

function getBooks(VERSION) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener(`readystatechange`, function() {
      if (this.readyState === this.DONE) {
        const {data} = JSON.parse(this.responseText);
        const books = data.map( ({name, id}) => { return {name, id}; } );

        resolve(books);
      }
    });

    xhr.open(`GET`, `https://api.scripture.api.bible/v1/bibles/${VERSION}/books`);
    xhr.setRequestHeader(`api-key`, API_KEY);

    xhr.onerror = () => reject(xhr.statusText);

    xhr.send();
  });
}

function getParameterByName(name) {
  const url = window.location.href;
  name = name.replace(/[\[\]]/g, `\\$&`);
  const regex = new RegExp(`[?&]` + name + `(=([^&#]*)|&|#|$)`),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return ``;
  return decodeURIComponent(results[2].replace(/\+/g, ` `));
}

function searchButton(){
  const searchInput = document.querySelector(`#search-input`);
  window.location.href = `./buscar.html?query=${searchInput.value}`;
}