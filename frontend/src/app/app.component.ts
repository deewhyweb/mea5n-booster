import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

import { ContactService } from './services/contact.service';

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

  contacts: any;

  constructor(public contactService: ContactService) { }

  ngOnInit() {
    this.contactService.getContacts().subscribe(result => {
      this.contactService.contactBS.next(result);
      this.contacts = this.contactService.contactBS;
    });
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
