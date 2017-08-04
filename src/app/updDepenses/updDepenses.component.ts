import { Component, OnInit } from '@angular/core';
import { PersonneService } from '../services/personne.service';
import { DepenseService } from '../services/depense.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'my-app',
    templateUrl: './UpdDepenses.component.html',
    providers: [PersonneService, DepenseService]
})

export class UpdDepensesComponent implements OnInit {
    personneList: any[];
    personne: any[];
    depenseList: any[];
    depense: any;
    selectPers = 1;
    sub: any;
    id: number;

    constructor(public personneService: PersonneService, public transactionService: DepenseService, private route: ActivatedRoute) {

    }

    ngOnInit() {

        this.sub = this.route.params.subscribe(params => {
          this.id = +params['id'];
        });

        this.personneService.getPersonne().subscribe((data) => this.personneList = data);
        this.personneService.getPersonneId(this.selectPers).subscribe((data) => this.personne = data); // /!\ ID A MODIFIER
        this.transactionService.getDepPers(this.selectPers).subscribe((data) => this.depenseList = data); // /!\ ID A MODIFIER
        this.transactionService.getDepId(this.id).subscribe((data) => this.depense = data); // /!\ ID A MODIFIER
    }
/*

    onChange(id: number): void {
      if ( id == 0) {
        this.selectPers = id;
        this.transactionService.getDepPers().subscribe((data) => this.depenseList = data); // /!\ ID A MODIFIER
      } else {
        this.selectPers = id;
        this.transactionService.getDepPers(id).subscribe((data) => this.depenseList = data); // /!\ ID A MODIFIER
      }
    }
*/
}
