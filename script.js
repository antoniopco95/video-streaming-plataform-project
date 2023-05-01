const containerMovies = document.querySelector(".movies");
const prevButton = document.querySelector(".btn-prev");
const nextButton = document.querySelector(".btn-next");
const inputSearch = document.querySelector(".input");
const highlightVideo = document.querySelector(".highlight__video");
const highlightTitle = document.querySelector(".highlight__title");
const highlightRating = document.querySelector(".highlight__rating");
const highlightGenres = document.querySelector(".highlight__genres");
const highlightLaunch = document.querySelector(".highlight__launch");
const highlightDescription = document.querySelector(".highlight__description");
const highlightVideoLink = document.querySelector(".highlight__video-link");

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

async function dayMovie() {
    try {
        const generalEndpoint = await api.get("/3/movie/436969?language=pt-BR");
        const videosEndpoint = await api.get("/3/movie/436969/videos?language=pt-BR");
        let stringGenres = [""];

        highlightVideo.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${generalEndpoint.data.backdrop_path}')`;
        highlightVideo.style.backgroundSize = "cover";
        highlightTitle.textContent = generalEndpoint.data.title;
        highlightRating.textContent = generalEndpoint.data.vote_average.toFixed(1);

        for (const genre of generalEndpoint.data.genres) {
            stringGenres.push(genre.name);
        }

        stringGenres.shift();

        highlightGenres.textContent = stringGenres.join(", ");

        highlightLaunch.textContent = new Date(generalEndpoint.data.release_date).toLocaleDateString("pt-BR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            timeZone: "UTC",
        });

        highlightDescription.textContent = generalEndpoint.data.overview;

        highlightVideoLink.href = `https://www.youtube.com/watch?v=${videosEndpoint.data.results[0].key}`;

    } catch (error) {
        return;
    }
}

dayMovie();







