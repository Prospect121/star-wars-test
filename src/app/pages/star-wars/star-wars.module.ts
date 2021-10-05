import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ChipsModule } from "src/app/shared/components/chips/chips.module";
import { TestTableModule } from "src/app/shared/components/table/test-table.module";
import { CharacterListComponent } from "./containers/character-list/character-list.component";
import { FilmListComponent } from "./containers/film-list/film-list.component";
import { StarWarsComponent } from "./star-wars.component";

export const routes: Routes = [
  {
    path: '',
    component: StarWarsComponent,
    children: [
      {
        path: '',
        redirectTo: 'film',
        pathMatch: 'full',
      },
      {
        path: 'character', component: CharacterListComponent,
      },
      {
        path: 'film', component: FilmListComponent
      },
    ]
  }
];

@NgModule({
    declarations: [
      StarWarsComponent,
      CharacterListComponent,
      FilmListComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ChipsModule,
        TestTableModule,
    ]
  })
  export class StarWarsModule {}
  