const containerMovies = document.querySelector(".movies");
const prevButton = document.querySelector(".btn-prev");
const nextButton = document.querySelector(".btn-next");


function showAll(movies) {
    for (const movie of movies) {
        const divMovie = document.createElement("div");
        divMovie.classList.add("movie");
        divMovie.style.backgroundImage = `url('${movie.poster_path}')`;
        containerMovies.appendChild(divMovie);

        const divMovieInfo = document.createElement("div");
        divMovieInfo.classList.add("movie__info");
        divMovie.appendChild(divMovieInfo);

        const spanMovieTitle = document.createElement("span");
        spanMovieTitle.classList.add("movie__title");
        spanMovieTitle.textContent = movie.title;
        divMovieInfo.appendChild(spanMovieTitle);

        const spanMovieRating = document.createElement("span");
        spanMovieRating.classList.add("movie__rating");
        spanMovieRating.textContent = movie.vote_average;
        divMovieInfo.appendChild(spanMovieRating);

        const imgStar = document.createElement("img");
        imgStar.src = "./assets/estrela.svg";
        imgStar.alt = "Estrela";
        spanMovieRating.appendChild(imgStar);


    }
}


async function loadAll() {
    try {
        const response = await api.get("/3/discover/movie?language=pt-BR&include_adult=false");
        const array = response.data.results.slice(0,18);
        showAll(array);
    } catch (error) {
        return;
    }
}

loadAll();
