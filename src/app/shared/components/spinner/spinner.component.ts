import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { fromRoot } from '../../store/reducers/indexstarwars';
import { startWarsReducer } from '../../store/reducers/star-wars.reducer';

@Component({
  selector: 'app-spinner',
  template: `
  <div class="father" *ngIf="isloading">
    <div class="loader"></div>
  </div>
  `,
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  isloading: boolean = false;
  
  constructor(private starWarsStore: Store<{StarWarsState: any}>) { }

  ngOnInit(): void {
    this.starWarsStore.subscribe(data => {
      this.isloading = data.StarWarsState.spinner;
    });
  }
}
