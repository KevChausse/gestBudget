import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PersonneService {
    apiUrl = 'http://localhost:3000/personnes/';
    constructor(public http: Http){ }

    getPersonne() {
        return this.http.get(this.apiUrl + 'pers/')
        .map(res => res.json());
    }

    getPersonneId(id) {
        return this.http.get(this.apiUrl + 'pers/' + id)
        .map(res => res.json());
    }

}