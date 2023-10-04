import { Injectable } from '@angular/core';
import * as CryptoJs from "crypto-js";

@Injectable({
  providedIn: 'root'
})
export class SecureserviceService {
private readonly seceretKey: string = "lakjdslfjdslkjfdsljfls";
  constructor() { }

  encrypt(value: string): string{
    return CryptoJs.AES.encrypt(value,this.seceretKey).toString();
  }
  
  decrypt(value: string): string{
        const bytes = CryptoJs.AES.decrypt(value,this.seceretKey);
        return bytes.toString(CryptoJs.enc.Utf8);
  }
  
}
