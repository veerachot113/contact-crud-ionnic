import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContactService, Contact } from '../services/contact.service';

@Component({
  selector: 'app-detail-contact',
  templateUrl: './detail-contact.page.html',
  styleUrls: ['./detail-contact.page.scss'],
})
export class DetailContactPage implements OnInit {
  contactId: string | undefined;
  contact: Contact | undefined;
  isFavorite: boolean = false;

  constructor(
    private route: ActivatedRoute,
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
      this.contact = contacts.find(c => c.id === this.contactId);
    });
  }

  fav() {
    this.isFavorite = !this.isFavorite;
    // Logic สำหรับการบันทึกการทำ Favorite
  }

  // ฟังก์ชันแปลงค่าประเภทเป็นภาษาไทย
  getCategoryInThai(category: string): string {
    const categoryMapping: { [key: string]: string } = {
      friends: 'เพื่อน',
      family: 'ครอบครัว'
    };
    return categoryMapping[category] || category;
  }
}
