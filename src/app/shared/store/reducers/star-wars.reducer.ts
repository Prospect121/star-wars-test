import { createReducer, on } from '@ngrx/store';
import { dataFilms, dataFilm, dataCharacter, listCharacter, spinner } from '../actions/star-wars.action'

export interface StarWarsState {
    films: any;
    film: any;
    character: any;
    listCharacter: any;  
    spinner: Boolean;
};

const initialState: StarWarsState = {
    films: null,
    film: null,
    character: null,
    listCharacter: null,
    spinner: false,
}

export const startWarsReducer = createReducer(initialState, 
    on(dataFilms, (state, action) => ({ films: action.films, film: null, character: null, listCharacter: state.listCharacter, spinner: false})),
    on(dataFilm, (state, action) => ({ film: action.film, films: state.films, character: state.character, listCharacter: state.listCharacter, spinner: true })),
    on(dataCharacter, (state, action) => ({ character: action.character, films: state.films, film: state.film, listCharacter: state.listCharacter, spinner: true})),
    on(listCharacter, (state, action) => ({listCharacter: action.list, character: state.character, films: state.films, film: state.film, spinner: true})),
    on(spinner, (state, action) => ({spinner: action.isActive, listCharacter: state.listCharacter, character: state.character, films: state.films, film: state.film,}))
);