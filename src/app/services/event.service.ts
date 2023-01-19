import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ICreateEvent } from '../models/ICreateEvent';
import { IEvent } from '../models/IEvent';
import { IUser } from '../models/IUser';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private _url : string = 'https://localhost:7245/api/'

  private _$events : Subject<IEvent[] | undefined> = new Subject<IEvent[] | undefined>()

  private _$myEvents : Subject<IEvent[] | undefined> = new Subject<IEvent[] | undefined>()

  $events : Observable<IEvent[] | undefined> = this._$events.asObservable()
  $myEvents : Observable<IEvent[] | undefined> = this._$myEvents.asObservable()
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
    this._httpClient.get<IEvent[]>(this._url + 'Activity/NextActivities').subscribe({
      next : (rep) => { 
        this._$events.next(rep)
      },
      error : (err) => { console.log(err);
      }
    })
  }
  //Pour les activité auxquelles je participe
  getAllMyEvents() : void {
    this._httpClient.get<IEvent[]>(this._url + 'Activity/MyActivities', { headers : { 'Authorization' : 'Bearer ' + localStorage.getItem('token') }}).subscribe({
      next : (rep) => {
        this._$myEvents.next(rep)
      },
      error : (err) => { console.log(err) }
    })
  }

  grosDeleteSaMer(id : number) : void {
    this._httpClient.delete(this._url + 'Activity/' + id, { headers : { 'Authorization' : 'Bearer ' + localStorage.getItem('token')}}).subscribe({
      next : () => { console.log(' I DID IT  MAN')
      }
    })
  }

  youReCancelMan(id : number) : void {
    let bob : boolean = true
    this._httpClient.patch(this._url + 'Activity/' + id + '/Cancel',bob, { headers : { 'Authorization' : 'Bearer ' + localStorage.getItem('token')}}).subscribe({
      next : () => { console.log('T es cancel mec');
      }
    })
  }
}
