import { createAction, props } from '@ngrx/store';
import { ICharacter } from '../../../pages/models/character/character-model';
import { IFilm } from '../../../pages/models/Film/film-model';


export const getFilms = createAction('[FILMS] Get Films');
export const getFilm = createAction('[FILM] Get Film', props<{path: string}>());

export const getCharacter = createAction('[CHARACTER] Get Character', props<{path: string}>());

export const dataFilm = createAction('[DATAFILM] Data Film', props<{film: IFilm}>());
export const dataFilms = createAction('[DATAFILMS] Data Films', props<{films: IFilm[]}>());

export const dataCharacter = createAction('[DATACHARACTER] Data Character', props<{character: ICharacter}>());


export const listCharacter = createAction('[LISTCHARACTER] listCharacter', props<{list: string[]}>());

export const spinner = createAction('[SPINNER] spinner', props<{isActive: Boolean}>());


