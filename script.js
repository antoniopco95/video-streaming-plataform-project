const containerMovies = document.querySelector(".movies");
const prevButton = document.querySelector(".btn-prev");
const nextButton = document.querySelector(".btn-next");

let counterMovies = 0;
let array = [];

function showAll(array) {
    containerMovies.innerHTML = "";
    for (const item of array.slice(counterMovies, counterMovies + 6)) {
        const divMovie = document.createElement("div");
        divMovie.classList.add("movie");
        divMovie.style.backgroundImage = `url('${item.poster_path}')`;
        containerMovies.appendChild(divMovie);

        const divMovieInfo = document.createElement("div");
        divMovieInfo.classList.add("movie__info");
        divMovie.appendChild(divMovieInfo);

        const spanMovieTitle = document.createElement("span");
        spanMovieTitle.classList.add("movie__title");
        spanMovieTitle.textContent = item.title;
        divMovieInfo.appendChild(spanMovieTitle);

        const spanMovieRating = document.createElement("span");
        spanMovieRating.classList.add("movie__rating");
        spanMovieRating.textContent = item.vote_average;
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
        array = response.data.results.slice(0, 18);
        showAll(array);
    } catch (error) {
        return;
    }
}

loadAll();

prevButton.addEventListener("click", () => {
    containerMovies.replaceChildren();
    if (counterMovies === 0) {
        counterMovies = 12;
        showAll(array);
    } else {
        counterMovies -= 6
        showAll(array);
    }
});

nextButton.addEventListener("click", () => {
    if (counterMovies === 12) {
        counterMovies = 0;
        showAll(array);
    } else if (counterMovies < 12) {
        counterMovies += 6;
        showAll(array);
    }
});

