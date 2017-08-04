import { Component, OnInit } from '@angular/core';
import { PersonneService } from '../services/personne.service';
import { DepenseService } from '../services/depense.service';

@Component({
    selector: 'my-app',
    templateUrl: './depenses.component.html',
    providers: [PersonneService, DepenseService]
})

export class DepensesComponent implements OnInit {
    personneList: any[];
    personne: any[];
    depenseList: any[];
    depense: any[];
    selectPers = 1;

    constructor(public personneService: PersonneService, public transactionService: DepenseService) {

    }

    ngOnInit() {
        this.personneService.getPersonne().subscribe((data) => this.personneList = data);
        this.personneService.getPersonneId(this.selectPers).subscribe((data) => this.personne = data); // /!\ ID A MODIFIER
        this.transactionService.getDepPers(this.selectPers).subscribe((data) => this.depenseList = data); // /!\ ID A MODIFIER
    }


    onChange(id: number): void {
      if ( id == 0) {
        this.selectPers = id;
        this.transactionService.getDepPers().subscribe((data) => this.depenseList = data); // /!\ ID A MODIFIER
      } else {
        this.selectPers = id;
        this.transactionService.getDepPers(id).subscribe((data) => this.depenseList = data); // /!\ ID A MODIFIER
      }
    }

}
