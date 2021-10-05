import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CharacterModel, CharacterModModel } from 'src/app/pages/models/character/character-model';
import { FilmModel } from 'src/app/pages/models/Film/film-model';
import { MasterList } from 'src/app/pages/models/master-list/master-list';
import { fromRoot } from 'src/app/shared/store/reducers/indexstarwars';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent extends MasterList implements OnInit, OnDestroy {
  readonly headers = [
    'Name',
    'Eye color',
    'Gender',
    'Films',
  ]; 

  listCharacters: CharacterModel = new CharacterModel;
  private listFilms: FilmModel = new FilmModel;
  private stop: boolean = false;

  listChips: {name:string, value:string}[]=[];

  protected subscriptions: Subscription[] = [];

  constructor( starWarsStore: Store<{StarWarsState: any}>, private router: Router,) { 
    super(starWarsStore);
  }

  ngOnInit(): void {
    const sub = this.starWarsStore.subscribe(data => {
      if(data.StarWarsState.listCharacter && data.StarWarsState.spinner && !this.stop ){
        this.stop = true;
        this.starWarsStore.dispatch(fromRoot.spinner({isActive: true}));
        this.getCharcaters(data.StarWarsState.listCharacter);
      }
      if(!data.StarWarsState.listCharacter){
        this.back();
      }
    });
    this.subscriptions.push(sub);
  }

  getCharcaters(listPath: string[]){
    if (listPath.length > 0){
      this.getDataCharcater(listPath);
    } else {
      let list: {id:string, urlList:string[]}[]=[]
      this.listDataCharacters.forEach(item => {
        const obj = {
          id: item.url.replace(/[^\d]/g, ''),
          urlList: item.films
        }
        list.push(obj);
      });
      this.getFilms(list);
    }
  }

  getDataCharcater(listPath: string[]){
    this.starWarsStore.dispatch(fromRoot.getCharacter({path: listPath[0]}));
    const sub = this.starWarsStore.subscribe(result => {
      if(result.StarWarsState.character != null && !this.listDataCharacters.find(item => item.url.replace(/[^\d]/g, '') === result.StarWarsState.character.url.replace(/[^\d]/g, ''))){
        let obj = new CharacterModModel();
        obj.name = result.StarWarsState.character.name;
        obj.eye_color= result.StarWarsState.character.eye_color;
        obj.films = result.StarWarsState.character.films;
        obj.gender = result.StarWarsState.character.gender;
        obj.url =  result.StarWarsState.character.url;
        this.listDataCharacters.push(obj);
        listPath= listPath.filter(item => item !== listPath[0]);
        this.getCharcaters(listPath);
      }
    });
    this.subscriptions.push(sub);
  }

  getFilms(list: {id:string, urlList:string[]}[]){
    if(list.length > 0){
      this.getDataFilm(list);
    }else {
      this.createListChips(this.listDataCharacters);
    }
  }

  getDataFilm(list: {id:string, urlList:string[]}[]){
    this.starWarsStore.dispatch(fromRoot.getFilm({path: list[0].urlList[0]}));
    const sub = this.starWarsStore.subscribe(result => {
      if(result.StarWarsState.film != null && !this.listFilms.results.find(item => item === result.StarWarsState.film) ){
        this.listFilms.results.push(result.StarWarsState.film);
        this.listDataCharacters.map(function(item: any){
          if(item.url.replace(/[^\d]/g, '') === list[0].id){
            item.name_films.push(result.StarWarsState.film.title);
          }
          return item;
        });
        if(list[0].urlList.length > 0){
          list[0].urlList= list[0].urlList.filter(item => item !== list[0].urlList[0]);
          list= list[0].urlList.length < 1?  list.filter(item => item !== list[0]): list;
        }
        this.getFilms(list);
      } 
    });
    this.subscriptions.push(sub);
  }

  onChangeFilter(event: any, data: string){
    this.onChangeFilters(event, data, this.listDataCharacters);
  }

  back() {
    this.stop = false;
    this.router.navigate(['start-wars/film']);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub && sub.unsubscribe());
};

}
