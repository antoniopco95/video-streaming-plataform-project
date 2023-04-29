const containerMovies = document.querySelector(".movies");
const prevButton = document.querySelector(".btn-prev");
const nextButton = document.querySelector(".btn-next");
const inputSearch = document.querySelector(".input");

let counterMovies = 0;


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


async function loadAll(endpoint) {
    try {
        const response = await api.get(endpoint);
        array = response.data.results.slice(0, 18);
        showAll(array);
    } catch (error) {
        return;
    }
}

loadAll("/3/discover/movie?language=pt-BR&include_adult=false");

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

inputSearch.addEventListener("keyup", (event) => {
    if (event.key === "Enter" && !inputSearch.value) {
        counterMovies = 0;
        loadAll("/3/discover/movie?language=pt-BR&include_adult=false");
        showAll(array);
    } else if (event.key === "Enter" && inputSearch.value) {
        counterMovies = 0;
        loadAll(`/3/search/movie?language=pt-BR&include_adult=false&query=${inputSearch.value}`);
        showAll(array);
        inputSearch.value = "";
    }
});







