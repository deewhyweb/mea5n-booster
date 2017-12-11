import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';

@Injectable()
export class ContactService {

  constructor(private http:Http) { }

  public contactBS = new BehaviorSubject<string>(null);

  getContacts() {
    return this.http.get('http://localhost:8080/contacts').map(res => res.json());
  }

  add(contact) {
    return this.http.post('http://localhost:8080/contacts', contact).map(res => res.json());
  }

  remove(id) {
    return this.http.delete(`http://localhost:8080/contacts/${id}`).map(res => res.json());
  }
}
