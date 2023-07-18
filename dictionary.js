//Getting the information using postal code

// const data = function () {
//   fetch(`https://api.postalpincode.in/pincode/110001`)
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => console.log(data))
//     .catch((err) => console.log("Cant fetch data"));
// };

// data();

//Selecting out elements

const nav = document.querySelector(".navigation");
const input = document.getElementById("input");
const searchIcon = document.getElementById("search-logo");
const recent = document.querySelector(".recent-search");
const contentCotainer = document.querySelector(".content");
const mainContent = document.querySelector(".content-card");
const modal = document.querySelector(".modal");
const crossbtn = document.querySelector(".cross");
const historyButton = document.querySelectorAll(".search-list");
const searchedWord = document.querySelectorAll(".searched-word");
const deleteHistory = document.querySelector(".delete-history");

let _history = [];

//As soon as the page loads

document.documentElement.addEventListener("loads", function () {
  storeData();
  input.focus();
  getData();
});

//Creating the error model
const errorMessage = function () {
  modal.classList.remove("modal-hidden");
  nav.style.filter = "blur(10px)";
  contentCotainer.style.filter = "blur(10px)";
  input.value = "";
  input.focus();
};

//Creating the html element

const createHtml = function (data) {
  const html = ` <div class="small-heading">
    <p>Meaning of <b>${data[0].word}</b> in English</p>
  </div>
  <hr />

  <div class="word-search">
    <p>${data[0].word}</p>
  </div>

  <div class="part-of-speech">
    <p>[${data[0].meanings[0].partOfSpeech}]</p>
  </div>
  <hr />

  <div class="word-meaning">
    <h3>Meaning</h3>
    <p>➡️${data[0].meanings[0].definitions[0].definition}</p>
 
    
  </div>

  <div class="example">
    <h3>Examples</h3>
    <p>🗣️${(data[0].meanings[0].definitions[0].example = "undefined"
      ? "No Example found"
      : data[0].meanings[0].definitions[0].example)}</p>
  </div>

  <div class="antonyms">
    <h3><u>Antonyms</u></h3>

    <p>${data[0].meanings[0].antonyms[0]}</p>    
  </div>

  <div class="synonyms">
    <h3><u>Synonyms</u></h3>
    <p>${data[0].meanings[0].synonyms[0]}</p>
  </div>`;

  mainContent.insertAdjacentHTML("beforeend", html);
};

//Dictonary api

const action = function () {
  const wordToGet = input.value;

  mainContent.innerHTML = "";

  const getAPi = function (word) {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        createHtml(data);
      })
      .catch((err) => errorMessage());
  };

  getAPi(wordToGet);

  _history.unshift(wordToGet);

  storeData();

  getData();
};

searchIcon.addEventListener("click", action);

document.documentElement.addEventListener("keydown", function (e) {
  if (e.key === "Enter") action();
});

//Storing the data

// let click = -1;

const displayHistory = function (his) {
  // click++;
  const hisHtml = `<div class="search-list search1">
  <p class ="searched-word">${his[0]}</p>
</div>
`;

  recent.insertAdjacentHTML("afterbegin", hisHtml);
};

const storeData = function () {
  localStorage.setItem("data", JSON.stringify(_history));
};

const clearData = function () {
  localStorage.removeItem("data");
  recent.innerHTML = "";
  _history = [];
};

let hisdata;

const getData = function () {
  hisdata = JSON.parse(localStorage.getItem("data"));

  if (hisdata.length > 9) {
    hisdata.pop();

    recent.innerHTML = "";

    deleteHistory.classList.remove("delete-history-hidden");

    recent.insertAdjacentHTML(
      "afterbegin",
      `
    <div class="search-list search1">
    <p>${hisdata[0]}</p>
  </div>

  <div class="search-list search1">
    <p>${hisdata[1]}</p>
  </div>

  <div class="search-list search1">
    <p>${hisdata[2]}</p>
  </div>

  <div class="search-list search1">
    <p>${hisdata[3]}</p>
  </div>

  <div class="search-list search1">
    <p>${hisdata[4]}</p>
  </div>

  <div class="search-list search1">
    <p>${hisdata[5]}</p>
  </div>

  <div class="search-list search1">
    <p>${hisdata[6]}</p>
  </div>

  <div class="search-list search1">
    <p>${hisdata[7]}</p>

    </div>

    <div class="search-list search1">
    <p>${hisdata[8]}</p>
  </div>
  </div>
 
  `
    );
  } else displayHistory(hisdata);
};

//Modal cutting feature

crossbtn.addEventListener("click", function () {
  modal.classList.add("modal-hidden");
  nav.style.filter = "blur(0px)";
  contentCotainer.style.filter = "blur(0px)";
  input.value = "";
  input.focus();
});

// Delete historyButton

deleteHistory.addEventListener("click", clearData);
