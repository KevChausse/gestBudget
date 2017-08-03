import { Component, OnInit } from '@angular/core';
import { PersonneService } from '../services/personne.service';
import { TransactionService } from '../services/transaction.service';

@Component({
  selector: 'app-root',
  templateUrl: './index.component.html',
  providers: [PersonneService, TransactionService]
})
export class IndexComponent implements OnInit {
    personneList: any[];
    personne: any[];
    transactions: any[];
    totalTransac: any[];
    selectPers = 1;

    constructor(public personneService: PersonneService, public transactionService: TransactionService) {

    }

    ngOnInit() {
        this.personneService.getPersonne().subscribe((data) => this.personneList = data);
        this.personneService.getPersonneId(this.selectPers).subscribe((data) => this.personne = data); // /!\ ID A MODIFIER
        this.transactionService.getTransacId(this.selectPers).subscribe((data) => this.transactions = data); // /!\ ID A MODIFIER
        this.transactionService.getTotalId(this.selectPers).subscribe((data) => this.totalTransac = data); // /!\ ID A MODIFIER
    }


    onChange(id: number): void {
      if ( id == 0) {
        window.location.href = '/indexTotal';
      }
        this.selectPers = id;
        this.transactionService.getTransacId(id).subscribe((data) => this.transactions = data); // /!\ ID A MODIFIER
        this.transactionService.getTotalId(id).subscribe((data) => this.totalTransac = data); // /!\ ID A MODIFIER
    }

}
