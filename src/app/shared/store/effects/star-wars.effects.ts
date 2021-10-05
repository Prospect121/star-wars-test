import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { StarWarsDataService } from "src/app/pages/services/star-wars-data.service";
import { dataCharacter, dataFilm, dataFilms, getCharacter, getFilm, getFilms } from "../actions/star-wars.action";
import { map, mergeMap, tap } from 'rxjs/operators'
import { FilmModModel } from "src/app/pages/models/Film/film-model";

@Injectable()
export class StartWarsEffects {

    constructor(private actions$: Actions, private starWarsData: StarWarsDataService){}

    getFilmsDataEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getFilms),
            mergeMap((action) => {
                return this.starWarsData.getFilms().pipe(
                    map(resp => {
                        let list: FilmModModel[] = [];
                        resp.forEach(item => {
                            let obj = new FilmModModel();
                            obj.characters = item.characters;
                            obj.director = item.director;
                            obj.episode_id =  item.episode_id;
                            obj.title = item.title;
                            list.push(obj);
                        })
                        return dataFilms({films: list});
                    })
                );
            })
        )
    });

    getFilmDataEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getFilm),
            mergeMap((action) => {;
                return this.starWarsData.getFilm(action.path).pipe(
                    map(resp => {
                        let obj = new FilmModModel();
                        obj.characters = resp.characters;
                        obj.director = resp.director;
                        obj.episode_id =  resp.episode_id;
                        obj.title = resp.title;
                        return dataFilm({film: resp});
                    }),
                );
            })
        )
    });

    getCharacterDataEffect$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getCharacter),
            mergeMap((action) => {;
                return this.starWarsData.getCharacter(action.path).pipe(
                    map(resp => dataCharacter({character: resp})),
                );
            })
        )
    });

}