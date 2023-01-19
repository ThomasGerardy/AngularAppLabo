import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { IEvent } from '../models/IEvent';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-event-joined',
  templateUrl: './event-joined.component.html',
  styleUrls: ['./event-joined.component.scss']
})
export class EventJoinedComponent implements OnInit{
 
  eventJoined : IEvent[] | undefined 

  constructor(private _es : EventService, private _rs : RegistrationService) {}

  ngOnInit(): void {
    this._es.getAllMyEvents()
    this._es.$myEvents.subscribe({
      next : (res) => {
        this.eventJoined = res
      }
    })
  }
  leave(eventId : number){
    this._rs.leave(eventId)
  }
}
