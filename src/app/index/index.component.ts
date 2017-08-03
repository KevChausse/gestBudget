import { Component, OnInit } from '@angular/core';
import { PersonneService } from '../services/personne.service';

@Component({
  selector: 'app-root',
  templateUrl: './index.component.html',
  providers: [PersonneService]
})
export class IndexComponent implements OnInit {
    personne: any[];

    constructor(public personneService: PersonneService) {

    }

    ngOnInit() {
        this.personneService.getPersonne().subscribe((data) => this.personne = data);
    }
}
