import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from "@ngrx/store"
import { EffectsModule } from '@ngrx/effects'
import { fromRoot } from './shared/store/reducers/indexstarwars';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerModule } from './shared/components/spinner/spinner.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({StarWarsState: fromRoot.startWarsReducer}),
    EffectsModule.forRoot([fromRoot.StartWarsEffects]),
    SpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
