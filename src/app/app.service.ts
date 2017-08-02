import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PersonneService {
    apiUrl = "http://localhost:3000/";
    constructor(public http: Http){ }

    getPersonne(){
        return this.http.get(this.apiUrl)
        .map(res => res.json());
    }
}