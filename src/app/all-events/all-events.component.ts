import { Component, OnInit } from '@angular/core';
import { IEvent } from '../models/IEvent';
import { EventService } from '../services/event.service';
import { AuthService } from '../services/auth.service';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-all-events',
  templateUrl: './all-events.component.html',
  styleUrls: ['./all-events.component.scss']
})
export class AllEventsComponent implements OnInit{
  events : IEvent[] | undefined


  constructor(private _es : EventService, private _as : AuthService, private _rs : RegistrationService) { }

  ngOnInit(): void {
    this._es.getAll()
    this._es.$events.subscribe({
      next : (res) => {
        this.events = res        
      },
      error : (err) => {
        console.log(err)
      } 
    })
  }
}
