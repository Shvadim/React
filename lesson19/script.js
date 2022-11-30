const numberOfFilms = +prompt('Сколько фильмов Вы уже посмотрели', '');

const personalMoviewDB = {
   count: numberOfFilms,
   movies: {},
   actors: {},
   genres: [],
   privat: false   
};

let lastFilmWatched = prompt('Один из последних просмотренных фильмов?');
let levelLastFilmWatched = prompt('На сколько оцените его?');

personalMoviewDB.movies[lastFilmWatched] = levelLastFilmWatched;

lastFilmWatched = prompt('Один из последних просмотренных фильмов?');
levelLastFilmWatched = prompt('На сколько оцените его?');

personalMoviewDB.movies[lastFilmWatched] = levelLastFilmWatched;

console.log(personalMoviewDB);