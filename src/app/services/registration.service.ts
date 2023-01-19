import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IJoin } from '../models/IJoin';
import { IEvent } from '../models/IEvent';
import { IGetRegistration } from '../models/IGetRegistration';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private _url : string = 'https://localhost:7245/api/Registration/'
  constructor(private _httpclient : HttpClient) { }

  join(eventId : number, guest : IJoin) : void {
    this._httpclient.post(this._url + 'Join/' + eventId, guest, { headers : {'Authorization' : 'Bearer ' + localStorage.getItem('token')}}).subscribe({
      next : () => { }, 
      error : err => console.log(err)
      
    })
  }


  leave(eventId : number){
    this._httpclient.post(this._url + 'Leave/' + eventId, { }, { headers : { 'Authorization' : 'Bearer ' + localStorage.getItem('token')}}).subscribe({
      next : () => { console.log('Un soladat parti trop tôt') },
      error : err => console.log(err)
      
    })
  }
}
