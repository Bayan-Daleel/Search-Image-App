const searchElm = document.getElementById("search-input");
const formElm = document.querySelector("form");
const searchResultsElm = document.querySelector(".search-results");
const showMoreButtonEl = document.getElementById("show-more-button");
const accessKey = "ovMLzCWqlyzkb0RLsJ5URxuloZbmwBpzl3CVkv_niUI";

let dataInput = "";
let page = 1;

async function searchImages() {
  dataInput = searchElm.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${dataInput}&client_id=${accessKey}`;
  const response = await fetch(url);
  const data = await response.json();
  if (page === 1) {
    searchResultsElm.innerHTML = "";
  }
  const results = data.results;

  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    const image = document.createElement("img");
    console.log(imageWrapper);
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;
    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    console.log(imageWrapper);
    searchResultsElm.appendChild(imageWrapper);
    //console.log(searchResultsElm);
    page++;
  });

  if (page > 1) {
    showMoreButtonEl.style.display = "block";
  }
}

formElm.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
});

showMoreButtonEl.addEventListener("click", () => {
  searchImages();
});
