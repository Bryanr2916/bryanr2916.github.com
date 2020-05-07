const bibleChapterList = document.querySelector(`#chapter-list`);
const bibleBookID = getParameterByName(`book`);
const bibleSectionList = document.querySelector(`#section-list`);
var bookName='';

let chapterHTML = ``;
let sectionHTML = ``;

if (!VERSION || !bibleBookID) {
  window.location.href = `./index.html`;
}

getBooks(VERSION).then((bookList) => 
{
  for (let book of bookList) {
    if(bibleBookID==book.id)
    {
      bookName=book.name;
    }
  }
  
  getChapters(VERSION, bibleBookID).then((chapterList) => {
    chapterHTML += `<ol>`;
    for (let chapter of chapterList) {
      chapterHTML += `<li class="grid"><a class="grid-link" href="capitulo.html?&chapter=${chapter.id}"> ${chapter.number} </a></li>`;
    }

    bibleChapterList.innerHTML = chapterHTML;

  });
  
  document.querySelector(`#viewing`).innerHTML = `${bookName}`;
  const breadcrumbsHTML = `
    <ul>
      <li><a href="index.html">Inicio</a></li>
      <li><a href="#">${bookName}</a></li>
    </ul>
  `;
  breadcrumbs.innerHTML = breadcrumbsHTML;
});


function getChapters(VERSION, bibleBookID) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener(`readystatechange`, function() {
      if (this.readyState === this.DONE) {
        const {data} = JSON.parse(this.responseText);
        const chapters = data.map( ({number, id}) => { return {number, id}; } );

        resolve(chapters);
      }
    });

    xhr.open(`GET`, `https://api.scripture.api.bible/v1/bibles/${VERSION}/books/${bibleBookID}/chapters`);
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

function searchButton(){
  const searchInput = document.querySelector(`#search-input`);
  window.location.href = `./buscar.html?query=${searchInput.value}`;
}