import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { IUser } from '../models/IUser';
import { Router } from '@angular/router';
import { EventService } from '../services/event.service';
import { IEvent } from '../models/IEvent';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.scss']
})
export class MyEventsComponent implements OnInit{
  connectedUser : IUser | undefined
  myevents : IEvent[] | undefined
  faute : boolean = false

  constructor(private _as : AuthService, private _es : EventService, private _route : Router) {}

  // TODO : gérer le petit bug -> quand on est sur my-events et qu'on se déco, on ne peut pas retourner sur l'accueil
  ngOnInit(): void { 
    this._as.$connectedUser.subscribe({
      next : (user : IUser | undefined) => {
        this.connectedUser = user
        if(!this.connectedUser)
          this._route.navigateByUrl('/login')
      }
    })
    this._es.getAll()
    this._es.$events.subscribe({
      next : (res) => {
        this.myevents = res
        this.getMyActivities()
      },
      error : (err) => {console.log(err);}
    })
  }

  getMyActivities() : void {
    this.myevents = this.myevents?.filter(e => e.creator.id === parseInt(localStorage.getItem('userId') ?? ''))
  }

  delete(id : number) : void {
    this._es.grosDeleteSaMer(id)
    this._route.navigateByUrl('my-events')
  }

  cancel(id : number) : void {
    this._es.youReCancelMan(id)
  }

  update(id : number) : void{
    this.faute = !this.faute
  }
}
