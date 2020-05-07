const bibleVerseList = document.querySelector(`#verse-list`);
const chapterText = document.querySelector(`#chapter-text`);
const bibleChapterID = getParameterByName(`chapter`);
const bibleBookID = bibleChapterID.split('.')[0];
let verseHTML = ``;
let bookName = ``;

if (!VERSION || !bibleChapterID) {
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

  getVerses(VERSION, bibleChapterID).then((verseList) => {
    verseHTML += `<ol>`;
    for (let verse of verseList) 
    {
      const verseNumber = getVerseNumber(verse.id);
      verseHTML += `<li class="grid"><a class="grid-link" href="versiculo.html?&verse=${verse.id}"> ${verseNumber} </a></li>`;
    }
    verseHTML += `</ol>`;
    bibleVerseList.innerHTML = verseHTML;
  });
  
  getChapterText(bibleChapterID).then((content) => {
    chapterText.innerHTML = content;
  });
  
  const [book, chapter] = bibleChapterID.split(`.`);
  const breadcrumbsHTML = `
    <ul>
      <li><a href="index.html">Inicio</a></li>
      <li><a href="libro.html?book=${bibleBookID}">${bookName}</a></li>
      <li><a href="#">Capítulo: ${chapter}</a></li>
    </ul>
  `;
  breadcrumbs.innerHTML = breadcrumbsHTML;

  var viewing_title=`${bookName}`;
  viewing_title+=` : `;
  viewing_title+=`${chapter}`;
  
  document.querySelector(`#viewing`).innerHTML = viewing_title;

});



function getVerses(VERSION, bibleChapterID) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener(`readystatechange`, function() {
      if (this.readyState === this.DONE) {
        const {data} = JSON.parse(this.responseText);
        const verses = data.map( ({id}) => { return {id};} );

        resolve(verses);
      }
    });

    xhr.open(`GET`, `https://api.scripture.api.bible/v1/bibles/${VERSION}/chapters/${bibleChapterID}/verses`);
    xhr.setRequestHeader(`api-key`, API_KEY);

    xhr.onerror = () => reject(xhr.statusText);

    xhr.send();
  });
}

function getChapterText(bibleChapterID) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener(`readystatechange`, function() {
      if (this.readyState === this.DONE) {
        const {data, meta} = JSON.parse(this.responseText);

        _BAPI.t(meta.fumsId);
        resolve(data.content);
      }
    });

    xhr.open(`GET`, `https://api.scripture.api.bible/v1/bibles/${VERSION}/chapters/${bibleChapterID}`);
    xhr.setRequestHeader(`api-key`, API_KEY);

    xhr.onerror = () => reject(xhr.statusText);

    xhr.send();
  });
}

function getVerseNumber(verseID) {
  let verseNumber;
  if (verseID.includes(`-`)) {
    verseNumber = verseID.split(`-`).shift().split(`.`).pop() + `-` + verseID.split(`-`).pop().split(`.`).pop();
  } else {
    verseNumber = verseID.split(`.`).pop();
  }
  return verseNumber;
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