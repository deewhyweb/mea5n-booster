import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

@Injectable()
export class ContactService {

  constructor(private http:Http) { }

  public contactBS = new BehaviorSubject<string>(null);

  getContacts() {
    return this.http.get('http://localhost:3000/contacts').map(res => res.json());
  }
}
