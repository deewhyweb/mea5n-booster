import { Component } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

import { ContactService } from './services/contact.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public name: string;
  public email: string;
  public number: string;
  public id: string;

  contacts: any;

  constructor(public contactService: ContactService) { }

  ngOnInit() {
    this.contactService.getContacts().subscribe(result => {
      this.contactService.contactBS.next(result);
      this.contacts = this.contactService.contactBS;
    });
  }

  add({form, value}) {
    form.reset();
    this.contactService.add(value).subscribe(res => {
      this.ngOnInit();
    });
  }

  edit(id) {
    this.contactService.edit(id).subscribe(res => {
      this.name = res.name;
      this.email = res.email;
      this.number = res.number;
      this.id = res._id;
    });
  }
  
  update({form, value}) {
    form.reset();
    this.contactService.update(value, this.id).subscribe(res => {
      this.ngOnInit();
    });
  }

  remove(id) {
    this.contactService.remove(id).subscribe(res => {
      this.ngOnInit();
    });
  }

}
