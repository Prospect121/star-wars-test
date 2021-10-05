import { dataCharacter, dataFilm, dataFilms, listCharacter, getCharacter, getFilm, getFilms, spinner } from "../actions/star-wars.action";
import { StartWarsEffects } from "../effects/star-wars.effects";
import { getStateCharacter, getStateFilm, getStateFilms, } from "../selectors/star-wars.selector";
import { startWarsReducer } from "./star-wars.reducer";

export const fromRoot = {
    getFilms,
    getFilm,
    getCharacter,
    dataFilms,
    dataFilm,
    dataCharacter,
    listCharacter,
    spinner,
    startWarsReducer,
    StartWarsEffects,
    getStateFilms,
    getStateFilm,
    getStateCharacter,
};