const bibleVerseTitle = document.querySelector(`#verse`);
const bibleVerseList = document.querySelector(`#verse-content`);
const bibleVerseID = getParameterByName(`verse`);
const bibleBookID = bibleVerseID.split('.')[0];
const bibleChapterID = bibleVerseID.split('.')[1];

let bookName = ``;

if (!VERSION || !bibleVerseID) {
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

  getSelectedVerse(VERSION, bibleVerseID).then(({ content, reference }) => {
    bibleVerseTitle.innerHTML = `<span><i>${reference}</i></span>`;
    bibleVerseList.innerHTML = `<div class="eb-container">${content}</div>`;
  });
  
  let [book, chapter, verse] = bibleVerseID.split(`.`);
  if (bibleVerseID.includes(`-`)) {
    verse = bibleVerseID.split(`-`).shift().split(`.`).pop() + `-` + bibleVerseID.split(`-`).pop().split(`.`).pop();
  }
  const breadcrumbsHTML = `
    <ul>
      <li><a href="index.html"> Inicio </a></li>
      <li><a href="libro.html?book=${bibleBookID}"> ${bookName} </a></li>
      <li><a href="capitulo.html?chapter=${bibleBookID+'.'+bibleChapterID}"> Capítulo: ${bibleChapterID} </a></li>
      <li><a href="#"> Versículo: ${bibleVerseID.split('.')[2]}</a></li>
    </ul>
  `;
  breadcrumbs.innerHTML = breadcrumbsHTML;

});



function getSelectedVerse(VERSION, bibleVerseID) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener(`readystatechange`, function() {
      if (this.readyState === this.DONE) {
        const response = JSON.parse(this.responseText);
        const fumsId = response.meta.fumsId;
        const {content, reference} = response.data;
        const verse = {content, reference};

        _BAPI.t(fumsId);
        resolve(verse);
      }
    });

    xhr.open(`GET`, `https://api.scripture.api.bible/v1/bibles/${VERSION}/verses/${bibleVerseID}?include-chapter-numbers=false&include-verse-numbers=false`);
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