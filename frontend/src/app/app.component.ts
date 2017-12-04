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
    
  }

  add() {
    this.contacts.push({name: this.contact.name, 
      email: this.contact.email, 
      number: this.contact.number});
  }

  update() {

  }

  remove(id) {
    console.log('removed', id);
  }

}
