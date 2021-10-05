import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { FilmModel } from 'src/app/pages/models/Film/film-model';
import { fromRoot } from 'src/app/shared/store/reducers/indexstarwars';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss']
})
export class FilmListComponent implements OnInit {

  listFilm: FilmModel = new FilmModel;
  spinner: boolean = true;

  constructor(private starWarsStore: Store<{StarWarsState: any}>, private router: Router,) { }

  ngOnInit(): void {
    this.getFilms();
  }

  getFilms(){
    this.starWarsStore.dispatch(fromRoot.getFilms());
    this.starWarsStore.subscribe(item => {
      this.listFilm.results = item.StarWarsState.films;
      if(this.spinner){
        this.spinner = false;
        this.starWarsStore.dispatch(fromRoot.spinner({isActive: this.spinner}));
      }
    });
  }

  characters(characters: string[]){
    this.starWarsStore.dispatch(fromRoot.listCharacter({list: characters}));
    this.starWarsStore.dispatch(fromRoot.spinner({isActive: true}));
    this.goCharacters();
  }

  goCharacters(){
    this.router.navigate(['start-wars/character']);
  }

  lastCharacters(){
    this.starWarsStore.dispatch(fromRoot.spinner({isActive: true}));
    this.goCharacters();
  }


}
