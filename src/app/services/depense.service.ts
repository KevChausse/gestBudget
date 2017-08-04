import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DepenseService {
    apiUrl = 'http://localhost:3000/depenses/';

    constructor(public http: Http) { }

    getDepPers(id?) {
        if (id) {
            return this.http.get(this.apiUrl + 'pers/' + id)
            .map(res => res.json());
        } else {
            return this.http.get(this.apiUrl + 'pers/')
            .map(res => res.json());
        }
    }

    getDepId(id) {
        return this.http.get(this.apiUrl + 'dep/' + id)
        .map(res => res.json());
    }

}
