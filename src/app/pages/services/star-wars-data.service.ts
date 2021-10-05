import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { FilmModel, IFilm } from '../models/Film/film-model';
import { ICharacter } from '../models/character/character-model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StarWarsDataService {

  private readonly starWarsUrl = environment.baseUrl;
  private dataCharacter$: Subject<ICharacter>;

  constructor(private httpClient: HttpClient) { 
    this.dataCharacter$ = new Subject();
  }

  getFilms(): Observable<IFilm[]>{
    const url = `${this.starWarsUrl}films`;
    return this.httpClient.get<FilmModel>(url).pipe(
      map(resp => resp.results)
      );
  }

  getCharacter(path: string): Observable<ICharacter>{
    return this.httpClient.get<ICharacter>(path);
  }

  getFilm(path: string): Observable<IFilm>{
    return this.httpClient.get<IFilm>(path);
  }
}
