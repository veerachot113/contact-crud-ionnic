import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ContactService, Contact } from '../services/contact.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.page.html',
  styleUrls: ['./add-contact.page.scss'],
})
export class AddContactPage {
  newContact: Contact = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    category: '',
  };

  constructor(
    private contactService: ContactService,
    private modalController: ModalController
  ) {}

  // ฟังก์ชันตรวจสอบว่าข้อมูลครบถ้วนหรือไม่
  isFormValid(): boolean {
    return this.newContact.firstName !== '' &&
           this.newContact.lastName !== '' &&
           this.newContact.email !== '' &&
           this.newContact.phone !== '' &&
           this.newContact.category !== '';
  }

  saveContact() {
    if (this.isFormValid()) {
      this.contactService.addContact(this.newContact).then(() => {
        this.modalController.dismiss('saved');
      });
    } else {
      // สามารถแจ้งเตือนผู้ใช้ได้ถ้าต้องการ เช่น ใช้ ToastController
      console.log('Form is not valid');
    }
  }

  close() {
    this.modalController.dismiss();
  }
}
