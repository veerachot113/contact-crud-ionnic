import { Component, OnInit } from '@angular/core';
import { ContactService, Contact } from '../services/contact.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AddContactPage } from '../add-contact/add-contact.page'; // ต้อง import หน้า AddContact

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  contacts: Contact[] = [];
  filteredContacts: Contact[] = [];
  segment = 'all';

  constructor(
    private contactService: ContactService,
    private router: Router,
    private modalController: ModalController // ใช้ ModalController
  ) {}

  ngOnInit() {
    this.contactService.getContacts().subscribe(data => {
      this.contacts = data;
      this.filterContacts();
    });
  }

  filterContacts() {
    if (this.segment === 'all') {
      this.filteredContacts = this.contacts;
    } else {
      this.filteredContacts = this.contacts.filter(contact => contact.category === this.segment);
    }
  }

  segmentChanged() {
    this.filterContacts();
  }

  async openAddContactModal() {
    const modal = await this.modalController.create({
      component: AddContactPage,
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null && dataReturned.data === 'saved') {
        this.ngOnInit(); // รีโหลดข้อมูลถ้ามีการบันทึกข้อมูลใหม่
      }
    });

    return await modal.present();
  }
}
