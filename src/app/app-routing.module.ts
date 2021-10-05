import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'start-wars',
    pathMatch: 'full',
  },
  {
    path: 'start-wars',
    loadChildren: () => import('../app/pages/star-wars/star-wars.module').then(m => m.StarWarsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
