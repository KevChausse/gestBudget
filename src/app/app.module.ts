import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { mainComponent } from './main/main.component';
import { budgetComponent } from './budget/budget.component';
import { depenseComponent } from './depense/depense.component';
import { loginComponent } from './login/login.component';
import { personneComponent } from './personne/personne.component';
import { rentreeComponent } from './rentree/rentree.component';
import { RouterModule, Routes} from '@angular/router';

const appRoutes: Routes = [
  {path: 'budget', component: budgetComponent},
  {path: 'depense', component: depenseComponent},
  {path: 'login', component: loginComponent},
  {path: 'personne', component: personneComponent },
  {path: 'rentree', component: rentreeComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    budgetComponent,
    depenseComponent,
    loginComponent,
    personneComponent,
    rentreeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
