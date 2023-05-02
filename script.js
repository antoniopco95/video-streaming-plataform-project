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
const modal = document.querySelector(".modal");
const modalBody = document.querySelector(".modal__body");
const modalTitle = document.querySelector(".modal__title");
const modalDescription = document.querySelector(".modal__description");
const modalAverage = document.querySelector(".modal__average");
const modalImage = document.querySelector(".modal__img");
const modalGenres = document.querySelector(".modal__genres");
const modalClose = document.querySelector(".modal__close");
const themeButton = document.querySelector(".btn-theme");
const root = document.querySelector(":root");
const logo = document.querySelector(".logo");

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
        spanMovieRating.textContent = item.vote_average.toFixed(1);
        divMovieInfo.appendChild(spanMovieRating);

        const imgStar = document.createElement("img");
        imgStar.src = "./assets/estrela.svg";
        imgStar.alt = "Estrela";
        spanMovieRating.appendChild(imgStar);

        divMovie.addEventListener("click", () => {
            modal.classList.remove("hidden");
            loadModal(item.id);
        })

    }
}

modalBody.addEventListener("click", () => {
    modal.classList.add("hidden");
});

modalClose.addEventListener("click", () => {
    modal.classList.add("hidden");
});

window.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.classList.add("hidden");
    }
})

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

async function loadModal(item) {
    try {
        const modalInfo = await api.get(`/3/movie/${item}?language=pt-BR`);

        modalTitle.textContent = modalInfo.data.title;
        modalImage.src = modalInfo.data.belongs_to_collection.backdrop_path;
        modalDescription.textContent = modalInfo.data.overview;
        modalAverage.textContent = modalInfo.data.vote_average.toFixed(1);
        modalGenres.innerHTML = "";

        for (const genre of modalInfo.data.genres) {
            const spanGenre = document.createElement("span");
            spanGenre.classList.add("modal__genre");
            spanGenre.textContent = genre.name;
            modalGenres.appendChild(spanGenre);
        }
    } catch (error) {
        return;
    }
}

themeButton.addEventListener("click", () => {

    const currentBgColor = root.style.getPropertyValue("--background");

    if (!currentBgColor || currentBgColor === "#fff") {
        logo.src = "./assets/logo.svg";
        nextButton.src = "./assets/arrow-right-light.svg";
        prevButton.src = "./assets/arrow-left-light.svg";
        modalClose.src = "./assets/close.svg";
        themeButton.src = "./assets/dark-mode.svg";
        root.style.setProperty("--background", "#1B2028");
        root.style.setProperty("--text-color", "#FFFFFF");
        root.style.setProperty("--bg-secondary", "#2D3440");
        return;
    }
        logo.src = "./assets/logo-dark.png";
        nextButton.src = "./assets/arrow-right-dark.svg";
        prevButton.src = "./assets/arrow-left-dark.svg";
        modalClose.src = "./assets/close-dark.svg";
        themeButton.src = "./assets/light-mode.svg";
        root.style.setProperty("--background", "#FFF");
        root.style.setProperty("--text-color", "#1b2028");
        root.style.setProperty("--bg-secondary", "#ededed");
});










