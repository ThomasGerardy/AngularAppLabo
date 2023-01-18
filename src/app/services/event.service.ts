import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ICreateEvent } from '../models/ICreateEvent';
import { IEvent } from '../models/IEvent';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private _url : string = 'https://localhost:7245/api/'

  private _events : Subject<IEvent[] | undefined> = new Subject<IEvent[] | undefined>()
  constructor(private _httpClient : HttpClient) { }

  createEvent(eventForm : ICreateEvent) : void {
    this._httpClient.post(this._url + 'Activity', eventForm,{ headers : { 'Authorization' : 'Bearer ' + localStorage.getItem('token') }}).subscribe({
      next : (res) => {
        console.log(res) // TODO : trouver un truc mieux
      },
      error : (err) => {
        console.log(err) // TODO : trouver un truc mieux
      }
    })
  }
  getAll() : void {
    this._httpClient.get<IEvent[]>(this._url + 'NextActivities').subscribe({
      next : () => { 
        
      }

    })
  }
}
