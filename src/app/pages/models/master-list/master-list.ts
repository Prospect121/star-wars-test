import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { fromRoot } from 'src/app/shared/store/reducers/indexstarwars';
import { CharacterModModel } from '../character/character-model';

export interface IGetPagination {
    pagination?: { pageSize: number, pageNumber: number };
}

@Injectable()
export abstract class MasterList {

    newPages: any = [];
    listFilter: string[] = [];
    newListFilter:  CharacterModModel[] = [];
    pageShow: CharacterModModel[] = [];
    uniqueEye: any = new Set;
    uniqueGender: any = new Set;
    uniqueFilm: any = new Set;
    listDataCharacters: CharacterModModel[] = [];
    readonly quantities = [10,15,20];
    getPagination: IGetPagination = {
        pagination: {
            pageSize: 10,
            pageNumber: 0,
        }
    };
    pagination = {
      first: 0,
      last: 0,
      total: 0,
    }

    constructor(protected starWarsStore: Store<{StarWarsState: any}>) {}

    createListChips(listItem: CharacterModModel[]){
        this.onPagination(listItem, this.getPagination.pagination!.pageSize);

        let arrayEye: any[] = [];
        let arrayGender: any[] = [];
        let arrayFilm: any[] = [];
        listItem.forEach(item => {
            arrayEye.push(item.eye_color);
            arrayGender.push(item.gender);
            item.name_films.forEach(film => {arrayFilm.push(film);})
        });
        this.uniqueEye = [...new Set(arrayEye)];
        this.uniqueGender = [...new Set(arrayGender)];
        this.uniqueFilm= [...new Set(arrayFilm)];
    }

    onChangeFilters(event: any, name: string, listItem: CharacterModModel[]){

        let listData: CharacterModModel[] = [];
        this.listFilter = this.listFilter.filter(item => item != name);
        if(event){
            this.listFilter.push(name);
            listData = listItem.filter(item => item.eye_color === name || 
                item.gender === name || item.name_films.includes(name));
        }
        this.addDataFilter(listData); 

        if(!event){
           this.newListFilter = [];
           this.listFilter = this.listFilter.filter(item => item !== name);
            this.listFilter.forEach(data => {
                listData = listItem.filter(item => item.eye_color === data || 
                    item.gender === data || item.name_films.includes(data));
                this.addDataFilter(listData); 
            }); 
            if(this.newListFilter.length < 1){
                this.onPagination(this.listDataCharacters, this.getPagination.pagination!.pageSize);
                return;
            }
        }
        this.onPagination(this.newListFilter, this.getPagination.pagination!.pageSize);
    }

    addDataFilter(listData: CharacterModModel[] ){
        listData.forEach(item => {
            if(!this.newListFilter.includes(item)){
                this.newListFilter.push(item);
            }
        });
    }

    onPagination(listItem: CharacterModModel[], pageSize: number){
        this.newPages = [];
        this.getPagination.pagination!.pageSize = pageSize;
        for (let i = 0; i < listItem.length; i += pageSize) {
            let page = listItem.slice(i, i + pageSize);
            this.newPages.push(page);
        }

        let pages = (listItem.length / pageSize);
        pages = (pages > 0)? Math.ceil(pages): 1;
        this.pagination = {
            total: pages,
            first: (pages > 0)? 1: pages,
            last: (pages > 1)? 2: pages
        }
        this.getPagination.pagination!.pageNumber = this.pagination.first-1;
        this.goPageShow(this.getPagination.pagination!.pageNumber);
    }

    onPaginationChange(change: { pageSize?: any, pageNumber?: any }) {
        if(change.pageSize){
            this.onPagination((this.newListFilter.length > 0 )?this.newListFilter:this.listDataCharacters, change.pageSize);
        } else {
            this.getPagination.pagination!.pageNumber = change.pageNumber;
            this.goPageShow(this.getPagination.pagination!.pageNumber);
        }
    } 

    goPageShow(pageNumber: number){
        if(this.newPages.length > 0 ){
            this.pageShow = [];
            this.pageShow = this.newPages[pageNumber];
            this.starWarsStore.dispatch(fromRoot.spinner({isActive: false}));
        }
    }

    goNextPage(){
        if(this.getPagination.pagination!.pageNumber < this.pagination.total -1){
            this.pagination.first = this.pagination.first + 1;
            this.pagination.last = (this.pagination.last < this.pagination.total)? this.pagination.last + 1: this.pagination.last;
            this.onPaginationChange({ pageNumber: this.getPagination.pagination!.pageNumber+1});
        }
    }
    goPreviousPage(){
        const previousPage = this.getPagination.pagination!.pageNumber - 1;
        if (previousPage >= 0) {
            this.pagination.first -= 1;
            this.pagination.last = (this.pagination.last < this.pagination.first)? this.pagination.last - 1: this.pagination.last; 
            this.onPaginationChange({ pageNumber: previousPage })
        }
    }
    goLast(){
        if (this.pagination.first < this.pagination.total) {
            this.pagination.first = this.pagination.total;
            this.pagination.last = this.pagination.total;
            this.onPaginationChange({ pageNumber: this.pagination.total-1})
        }
    } 
    goFirst(){
        if (this.pagination.first > 1) {
            this.pagination.first = 1;
            this.pagination.last = this.pagination.first+1;
            this.onPaginationChange({ pageNumber: 0 });
        }
    }
}
