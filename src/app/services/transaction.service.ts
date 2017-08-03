import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class TransactionService {
    apiUrl = 'http://localhost:3000/';
    constructor(public http: Http){ }

    getTotalAll(){
        return this.http.get(this.apiUrl)
        .map(res => res.json());
    }

    getTransacId(id){
        return this.http.get(this.apiUrl + '/transac/' + id)
        .map(res => res.json());
    }

    getTotalId(id){
        return this.http.get(this.apiUrl + '/total/' + id)
        .map(res => res.json());
    }

}
