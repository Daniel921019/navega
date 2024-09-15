import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private storage: Storage) { 
    this.storage.create();
  }

  async isLoggedIn(): Promise<boolean> {
    const email = await this.storage.get('email');
    console.log(email)
    return email !== null;
  }

  async saveEmail(email: string): Promise<void> {
    await this.storage.set('email', email);
  }
  
}
