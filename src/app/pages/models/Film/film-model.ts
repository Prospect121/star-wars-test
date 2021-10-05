export class FilmModel {
    results: IFilm[];
    constructor(){
        this.results = [];
    }
}

export class FilmModModel {
    title: string;
    episode_id: number;
    director: string;
    characters: [];
    constructor(){
        this.title = "";
        this.episode_id = 0;
        this.director = "";
        this.characters = [];
    }
}

export interface IFilm {
    title: string;
    episode_id: number;
    director: string;
    characters: [];
}