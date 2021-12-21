let newsKey = "2c8d68bb18964fdaa2cb225dd8448168";

//
window.addEventListener("load", () => {
  const api = `https://newsapi.org/v2/top-headlines?country=sa&apiKey=${newsKey}`;
  //e.preventDefault();

  fetch(api)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
    //   console.log(data.articles.urlToImage);
    //   console.log(data.articles.title);
    //   console.log(data.articles.description);
    //   console.log(data.articles.author);
    //   console.log(data.articles.publishedAt);
    //   console.log(data.articles.url);

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
    });
});
