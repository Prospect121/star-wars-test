import { createSelector } from '@ngrx/store';
import { ICharacter } from "src/app/pages/models/character/character-model";
import { FilmModel, IFilm } from "src/app/pages/models/Film/film-model";
import { StarWarsState } from "../reducers/star-wars.reducer";

const getFilmsData = (state: StarWarsState): FilmModel => state.films;
const getFilmData = (state: StarWarsState): IFilm => state.film;
const getCharacter = (state: StarWarsState): ICharacter => state.character;

const getStateFilms = createSelector(
    (state: {starWarsState: StarWarsState}) => state.starWarsState,
    getFilmsData
);

const getStateFilm = createSelector(
    (state: {starWarsState: StarWarsState}) => state.starWarsState,
    getFilmData
);

const getStateCharacter = createSelector(
    (state: {starWarsState: StarWarsState}) => state.starWarsState,
    getCharacter
);

export { getStateFilms, getStateFilm, getStateCharacter };