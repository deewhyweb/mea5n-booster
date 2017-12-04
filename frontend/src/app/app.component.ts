import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  contact = {
    name: '',
    email: '',
    number: ''
  }

  contacts = [];

  constructor() { }

  ngOnInit() {
    this.contacts.push({name: 'foo', email: 'bar', number: '123'});
  }

  add() {
    this.contacts.push()
  }

  update() {

  }

  cleanup() {
    this.contact.name = '';
    this.contact.email = '';
    this.contact.number = '';
  }

}
