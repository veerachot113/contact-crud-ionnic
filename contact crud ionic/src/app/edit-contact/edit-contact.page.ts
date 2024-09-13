import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService, Contact } from '../services/contact.service';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.page.html',
  styleUrls: ['./edit-contact.page.scss'],
})
export class EditContactPage implements OnInit {
  contactId: string | undefined;
  contact: Contact = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    category: 'friends'
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService
  ) {}

  ngOnInit() {
    this.contactId = this.route.snapshot.paramMap.get('id') as string;
    if (this.contactId) {
      this.loadContact();
    }
  }

  loadContact() {
    this.contactService.getContacts().subscribe(contacts => {
      const foundContact = contacts.find(c => c.id === this.contactId);
      if (foundContact) {
        this.contact = foundContact;
      }
    });
  }

  saveContact() {
    if (this.contactId) {
      this.contactService.updateContact(this.contactId, this.contact).then(() => {
        this.router.navigate(['/home']); // นำทางกลับไปยังหน้า Home หลังจากบันทึก
      });
    }
  }

  deleteContact() {
    if (this.contactId) {
      this.contactService.deleteContact(this.contactId).then(() => {
        this.router.navigate(['/home']); // นำทางกลับไปยังหน้า Home หลังจากลบ
      });
    }
  }
}
