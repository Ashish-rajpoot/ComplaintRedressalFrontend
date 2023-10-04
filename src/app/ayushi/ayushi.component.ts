import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { SecureserviceService } from '../services/secureservice.service';

@Component({
  selector: 'app-ayushi',
  templateUrl: './ayushi.component.html',
  styleUrls: ['./ayushi.component.css']
})
export class AyushiComponent {
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value: number = 0; // Initialize value to 0

  constructor(private secureService: SecureserviceService) {
    this.changeValue();
  }

  changeValue() {
    let i = 0;
    const targetValue = 60; // Set your desired maximum value

    const updateValue = () => {
      if (i <= targetValue) {
        this.value = (i / targetValue) * 100; // Scale the value
        console.log(this.value);
        i++;
        setTimeout(updateValue, 1000);
      }
    };

    updateValue();
  }


  storeData() {
    const sensitiveData = 'My sensitive data';
    const encryptedData = this.secureService.encrypt(sensitiveData);
    localStorage.setItem('encryptedData', encryptedData);
  }

  retrieveData() {
    const encryptedData = localStorage.getItem('encryptedData');
    if (encryptedData) {
      const decryptedData = this.secureService.decrypt(encryptedData);
      console.log('Decrypted Data:', decryptedData);
    }
  }
}
