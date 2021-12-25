let newsKey = "2c8d68bb18964fdaa2cb225dd8448168";

let prevPage = 0;
let currentPage = 1;
let nextPage = 2;
let totalPages = 15;
let prev = document.getElementById("prev");
let current = document.getElementById("current");
let next = document.getElementById("next");
let currentCategory = "";
const newsButton = document.getElementById("newsButton");
const newsInput = document.getElementById("newsInput");
const mainNav = document.getElementById("nav").children;
const mainNavArray = [...mainNav];

// fetch news depends on category selected by user on navbar
mainNavArray.map((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    const id = item.id;
    const api = `https://newsapi.org/v2/top-headlines?category=${id}&pageSize=6&page=${currentPage}&language=en&apiKey=${newsKey}`;
    currentCategory = e.target.id;
    fetch(api)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        displayNews(data);
      });
  });
});

// search news button
newsButton.addEventListener("click", (e) => {
  e.preventDefault();
  getNews(newsInput.value);
  newsInput.value = "";
});
// search for specific news entred by user
const getNews = async (newsInput) => {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${newsInput}&from=2021-12-23&pageSize=6&page=${currentPage}&apiKey=${newsKey}`
    );
    const newsData = await response.json();
    console.log(newsData);

    let newsResult = newsData.articles;
    document.getElementById("news").innerHTML = newsResult.map(
      (element) =>
        `
      <div class="card">
        <div class="row ">
          <div class="col-3">
            <!-- image -->
            <img
              src="${element.urlToImage}"
              class="img-fluid mx-auto d-block"
              max-width: 100%; height: auto;
              alt="..."
            />
          </div>
          <div class="col-8">
            <!-- product header & info -->
            <div class="card-body">
              <h5 class="card-title">${element.title}</h5>
              <p class="card-text">${element.description}</p>
              <a
                class="p-2 text-decoration-none text-dark"
                href="${element.url}"
                ><button type="button" class="btn bg-purple2 btn-block">
                  Read more
                </button></a
              >
            </div>
          </div>
        </div>
      </div>
      `
    );
  } catch (error) {
    alert("No news found about " + newsInput);
  }
};
// ternary operator
// go to next page
next.addEventListener("click", () => {
  if (nextPage <= totalPages) {
    nextPage++;
    prevPage++;
    currentPage++;
    // fetch depends on category
    urlNext = `https://newsapi.org/v2/top-headlines?&${
      currentCategory ? "category=" + currentCategory + "&" : ""
    }country=sa&pageSize=6&page=${currentPage}&sortBy=popularity&language=en&apiKey=${newsKey}`;
    fetch(urlNext)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        displayNews(data);
      });
  }
});
// back to previous page
prev.addEventListener("click", () => {
  if (prevPage > 0) {
    nextPage--;
    prevPage--;
    currentPage--;
    // fetch depends on category
    urlPrev = `https://newsapi.org/v2/top-headlines?&${
      currentCategory ? "category=" + currentCategory + "&" : ""
    }country=sa&pageSize=6&page=${currentPage}&sortBy=popularity&language=en&apiKey=${newsKey}`;
    fetch(urlPrev)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        displayNews(data);
      });
  }
});

// display news on the cards
function displayNews(data) {
  let latestNews = data.articles;
  document.getElementById("news").innerHTML = latestNews.map(
    (element) =>
      `
      <div class="card">
        <div class="row ">
          <div class="col-3">
            <!-- image -->
            <img
              src="${element.urlToImage}"
              class="img-fluid mx-auto d-block"
              max-width: 100%; height: auto;
              alt="..."
            />
          </div>
          <div class="col-8">
            <!-- product header & info -->
            <div class="card-body">
              <h5 class="card-title">${element.title}</h5>
              <p class="card-text">${element.description}</p>
              <a
                class="p-2 text-decoration-none text-dark"
                href="${element.url}"
                ><button type="button" class="btn bg-purple2 btn-block">
                  Read more
                </button></a
              >
            </div>
          </div>
        </div>
      </div>
      `
  );
  //console.log(data.articles[0].source.category);
}

//display news once user open the page
window.addEventListener("load", () => {
  const api = `https://newsapi.org/v2/top-headlines?category=General&country=sa&pageSize=6&page=${currentPage}&sortBy=popularity&language=en&apiKey=${newsKey}`;
  fetch(api)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      displayNews(data);
    });
});
