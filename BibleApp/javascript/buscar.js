const resultsList = document.querySelector(`#results-list`);
const searchInput = document.querySelector(`#search-input`);
const searchNavTop = document.querySelector(`#search-nav-top`);
const searchNavBottom = document.querySelector(`#search-nav-bottom`);
const abbreviation = getParameterByName(`abbr`) || 'ASV';
const query = getParameterByName(`query`);
let bookName = ``;
let bookQuery=``;
let changeQuery=false;
let bookId='';

if (query) {

  getBooks(VERSION).then((bookList) => 
  {
    var lc_query=query.toLowerCase();

    bookQuery=lc_query.split(' ')[0];

    for (let book of bookList) {

      if(bookQuery==book.id.toLowerCase())
      {
        bookName=book.name;
      }
      else
      {
        
        var ws=book.name.toLowerCase().replace('san ','');

        if(bookQuery==ws)
        {
          bookName=bookQuery;
          changeQuery=true;
          bookId=book.id;
        }
      }

    }  

    if( bookName=='')
    {
      document.querySelector(`#viewing`).innerHTML = query; 
    }

    else
    {
      var replacement=lc_query.replace(bookQuery,bookName);
      document.querySelector(`#viewing`).innerHTML = replacement;
    }
    
    if(changeQuery)
    {
      search(query.replace(bookQuery,bookId).toUpperCase());
    }
    else
    {
      search(query.toUpperCase());
    }
    
  });

  
}

function search(searchText, offset = 0) {
  console.log('search text: '+searchText);
  searchInput.value = searchText;
  getResults(searchText, offset).then((data) => {
    let resultsHTML = ``;

    if (data.verses) {
      if (!data.verses[0]) {
        searchNavTop.innerHTML = ``;
        searchNavBottom.innerHTML = ``;
        resultsHTML = `<div class="no-results">La busqueda no dió ningún resultado. Vuelve al <a class="rediret" href="index.html"> Inicio</a></div>`;
      } else {
        const [topSearchNavHTML, searchNavHTML] = buildNav(offset, data.total, searchText);
        searchNavTop.innerHTML = topSearchNavHTML;
        searchNavBottom.innerHTML = searchNavHTML;

        resultsHTML += `<ul>`;
        for (let verse of data.verses) {
          resultsHTML += `<li>
            <h5>${verse.reference}</h5>
            <div class="text not-eb-container">${verse.text}</div>
            <a href="versiculo.html?version=${VERSION}&abbr=${abbreviation}&chapter=${verse.chapterId}">Ver Capítulo</a>
          </li>`;
        }
        resultsHTML += `<ul>`;
      }
    }

    if (data.passages) {
      searchNavTop.innerHTML = ``;
      searchNavBottom.innerHTML = ``;
      if (!data.passages[0]) {
        resultsHTML = `<div class="no-results">La busqueda no dió ningún resultado. Vuelve al <a class="rediret" href="index.html"> Inicio</a></div>`;
      } else {
        resultsHTML += `<ul>`;
        for (let passage of data.passages) {
          resultsHTML += `<li>
            <h5>${passage.reference}</h5>
            <div id="searched-content" class="text eb-container">${passage.content}</div>
            <a href="capitulo.html?chapter=${passage.chapterIds[0]}#chapter-text">Leer Capítulo Completo</a>
            <br>
            <a href="./index.html">Volver al inicio</a>
            <br>
          </li>`;
        }
        resultsHTML += `</ul>`;
      }
    }

    resultsList.innerHTML = resultsHTML;
  });
}

function buildNav(offset, total, searchText) {
  const topSearchNavHTML = `<span class="results-count">Mostrando <b>${offset*10+1}-${offset*10+10 > total ? total : offset*10+10}</b> de <b>${total}</b> resultados.</span>`
  let searchNavHTML = `<span class="results-current-page"> Página Actual: <b>${offset+1}</b></span>`;

  if (offset > 0 || total / 10 > offset+1) {
    searchNavHTML += `<span class="results-nav">`;
  }

  if (offset > 0) {
    searchNavHTML += `<button onclick="search('${searchText}', ${offset-1})">Página Anterior</button>`;
  }

  if (total / 10 > offset+1) {
    searchNavHTML += `<button onclick="search('${searchText}', ${offset+1})">Próxima Página</button>`;
  }

  if (offset > 0 || total / 10 > offset+1) {
    searchNavHTML += `</span>`;
  }

  return [topSearchNavHTML, searchNavHTML];
}

function getResults(searchText, offset = 0) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener(`readystatechange`, function() {
      if (this.readyState === this.DONE) {
        const {data, meta} = JSON.parse(this.responseText);
        _BAPI.t(meta.fumsId);
        resolve(data);
      }
    });

    xhr.open(`GET`, `https://api.scripture.api.bible/v1/bibles/${VERSION}/search?query=${searchText}&offset=${offset}`);
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
  window.location.href = `./buscar.html?&version=${VERSION}&abbr=${abbreviation}&query=${searchInput.value}`;
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