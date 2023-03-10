import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { IEvent } from '../models/IEvent';
import { RegistrationService } from '../services/registration.service';
import { Router } from '@angular/router';
import { UrlService } from '../services/url.service';

@Component({
  selector: 'app-event-joined',
  templateUrl: './event-joined.component.html',
  styleUrls: ['./event-joined.component.scss']
})
export class EventJoinedComponent implements OnInit{
 
  eventJoined : IEvent[] | undefined 

  constructor(private _es : EventService, private _rs : RegistrationService, private _us : UrlService) {}

  ngOnInit(): void {
    this._es.getAllMyEvents().subscribe({
      next : res => this.eventJoined = res
    })
    this._us.foundI().subscribe({
      next : res => {
        this._us.changeSelected(res)
      }
    })
  }
  leave(eventId : number){
    this._rs.leave(eventId)
    this._es.$myEvents.subscribe({
      next : (rep) => {
        this.eventJoined = rep
        this._es.getAllMyEvents().subscribe({
          next : res => this.eventJoined = res
        })
      }
    })
  }
}
