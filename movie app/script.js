// const API_URL = "https://api.themoviedb.org/3/discover/movie?sort_b"
// const API_KEY = "0e6b3010022a5d937f1a5f6cbfeedadc"

// const API_URL2 = 'https://api.themoviedb.org/3/movie/api_key=0e6b3010022a5d937f1a5f6cbfeedadc&language=en-US&page=1'

// variables for later use 

const API_URL_Discover = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=0e6b3010022a5d937f1a5f6cbfeedadc&page=1'

const IMG_path = 'https://image.tmdb.org/t/p/w1280'

const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?sort_by=popularity.desc&api_key=0e6b3010022a5d937f1a5f6cbfeedadc&query="'

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

// Get Initial movies 
getMovies(API_URL_Discover)

// async function to fetch API 
async function getMovies(url) {
    const response = await fetch(url)
    const data = await response.json()

    showMovies(data.results);
}

// function to display returned movies 

function showMovies(movies) {
    // clears the current display
    main.innerHTML = ''

    // loop through fetched data 
    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie

        // create div element holder and class for fetched data 

        const movieElement = document.createElement('div')
        movieElement.classList.add('movie')

        // insert fetched data(s - i.e. img, alt, title, vote_Avg, overview, etc.) into element 

        movieElement.innerHTML = `
       <img src="${IMG_path + poster_path}"
           alt="${title}">
       <div class="movie-info">
           <h3>${title}</h3>
           <span class="${getClassByRate(vote_average)}">${vote_average}</span>
       </div>
       <div class="overview">
           <h3>Overview</h3>
           ${overview}
       </div>`

        //    insert into DOM 
        main.appendChild(movieElement)
    });
}

// function to get rating and rating color 

function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green'
    } else if (vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

// search movie function 

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if (searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)
        search.value = ''
    } else {
        window.location.reload()
    }
})
