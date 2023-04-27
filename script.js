const containerMovies = document.querySelector(".movies");


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
        console.log(response.data.results);
        showAll(response.data.results);
    } catch (error) {
        console.log(error.response);
    }
}

loadAll();