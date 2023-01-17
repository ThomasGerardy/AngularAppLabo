import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { IUser } from '../models/IUser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.scss']
})
export class MyEventsComponent implements OnInit{
  connectedUser : IUser | undefined

  constructor(private _as : AuthService, private _route : Router) {}

  // TODO : gérer le petit bug -> quand on est sur my-events et qu'on se déco, on ne peut pas retourner sur l'accueil
  ngOnInit(): void { 
    this._as.$connectedUser.subscribe({
      next : (user : IUser | undefined) => {
        this.connectedUser = user
        if(!this.connectedUser)
          this._route.navigateByUrl('/login')
      }
    })
  }
  }
