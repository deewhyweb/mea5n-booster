import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class ContactService {

  constructor(private http: Http) { }

  public contactBS = new BehaviorSubject<string>(null);

  getContacts() {
    return this.http.get(`${environment.apiUrl}/contacts`).map(res => res.json());
  }

  add(contact) {
    return this.http.post(`${environment.apiUrl}/contacts`, contact).map(res => res.json());
  }

  edit(id) {
    return this.http.get(`${environment.apiUrl}/contacts/${id}`).map(res => res.json());
  }

  update(contact, id) {
    return this.http.put(`${environment.apiUrl}/contacts/${id}`, contact).map(res => res.json());
  }

  remove(id) {
    return this.http.delete(`${environment.apiUrl}/contacts/${id}`).map(res => res.json());
  }
}
