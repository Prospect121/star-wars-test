export class CharacterModel {
    characters: ICharacter[];
    constructor(){
        this.characters = [];
    }
}

export class CharacterModModel {
    name: string;
    eye_color: string;
    gender: string;
    films: [];
    name_films: string[];
    url: string;
    constructor(){
        this.name = "";
        this.eye_color = "";
        this.gender = "";
        this.films = [];
        this.name_films = [];
        this.url = "";
    }
}

export interface ICharacter {
    name: string;
    eye_color: string;
    gender: string;
    films: [];
    name_films: string[];
    url: string;
}