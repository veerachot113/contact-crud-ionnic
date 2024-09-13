import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreDocument} from '@angular/fire/compat/firestore'
import { Observable } from 'rxjs';

export interface Contact {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  category: string; // family or friends
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private firestore: AngularFirestore) {}

  getContacts(): Observable<Contact[]> {
    return this.firestore.collection<Contact>('contacts').valueChanges({ idField: 'id' });
  }

  addContact(contact: Contact): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.doc(`contacts/${id}`).set({ id, ...contact });
  }

  updateContact(id: string, contact: Contact): Promise<void> {
    return this.firestore.doc(`contacts/${id}`).update(contact);
  }

  deleteContact(id: string): Promise<void> {
    return this.firestore.doc(`contacts/${id}`).delete();
  }
}
