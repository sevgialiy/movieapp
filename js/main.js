const apiKey = 'ff90fc6af372021163dbc0e30454a6e1'




let year = 2020;
let currentPage = 1;
let totalPages = 10;

$(document).ready(function () {
    getMovies();
    let yearSelect = $('#year-select');
    for (let i = 2020; i > 2000; i--) {
        let option = document.createElement('option');
        option.value = i;
        option.innerHTML = i;
        yearSelect.append(option);
    }
});

function getMovies() {
    fetch(`https://api.themoviedb.org/3/discover/movie?year=${year}&api_key=${apiKey}&page=${currentPage}`)
        .then(response => response.json())
        .then(data => {
            $('#current-page').text(currentPage);
            totalPages = data.total_pages;
            console.log(data)
            createList(data.results);
        });
}





$('#year-select').change(function () {
    year = $(this).val();
    getMovies();
});

$('#page-prev').click(function () {
    if (currentPage === 1)
        return;

    currentPage -= 1;
    getMovies();
});

$('#page-next').click(function () {
    if (currentPage === totalPages)
        return;

    currentPage += 1;
    getMovies();
});

function createList(movies) {
    let container = $("#movies");
    container.html('');


    movies.forEach(movie => {
        let wrapper = document.createElement('div');
        wrapper.className = "movie-card";

        let content = document.createElement('div');
        content.className = 'movie-item-content';

        let image = document.createElement('img');
        image.src = 'https://image.tmdb.org/t/p/w500/' + movie.poster_path;
        image.alt = movie.title;
        image.width = 220;
        image.height = 300;
        wrapper.append(image);

        let title = document.createElement('h5');
        title.className = 'title';
        title.innerHTML = movie.original_title;
        content.append(title);

        let score = document.createElement('div');
        score.innerHTML = 'Rating: ' + (movie.vote_average > 0 ? movie.vote_average + '/10' : 'Not rated');
        content.append(score);

        let releaseDate = document.createElement('div');
        releaseDate.innerHTML = 'Release date: ' + movie.release_date;
        content.append(releaseDate);

        

        wrapper.append(content);
        container.append(wrapper);
    });

}