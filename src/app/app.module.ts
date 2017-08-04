import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { BudgetsComponent } from './budgets/budgets.component';
import { DepensesComponent } from './depenses/depenses.component';
import { IndexComponent } from './index/index.component';
import { LogoutComponent } from './logout/logout.component';
import { RentreesComponent } from './rentrees/rentrees.component';
import { UpdBudgetsComponent } from './updBudgets/updBudgets.component';
import { UpdDepensesComponent } from './updDepenses/updDepenses.component';
import { UpdRentreesComponent } from './updRentrees/updRentrees.component';
import { UpdUsersComponent } from './updUsers/updUsers.component';
import { UsersComponent } from './users/users.component';
import { RouterModule, Routes} from '@angular/router';

const appRoutes: Routes = [
  {path: 'budgets', component: BudgetsComponent},
  {path: 'depenses', component: DepensesComponent},
  {path: 'index', component: IndexComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'rentrees', component: RentreesComponent},
  {path: 'updBudgets', component: UpdBudgetsComponent},
  {path: 'updDepenses', component: UpdDepensesComponent},
  {path: 'updRentrees', component: UpdRentreesComponent},
  {path: 'updUsers', component: UpdUsersComponent},
  {path: 'users', component: UsersComponent},
  {path: '', redirectTo: '/index', pathMatch: 'full'}
];


@NgModule({
  declarations: [
    AppComponent,
    BudgetsComponent,
    DepensesComponent,
    IndexComponent,
    LogoutComponent,
    RentreesComponent,
    UpdBudgetsComponent,
    UpdDepensesComponent,
    UpdRentreesComponent,
    UpdUsersComponent,
    UsersComponent
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
