import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { IUser } from '../models/IUser';
import { JwtService } from '../services/jwt.service';
import { IAuthResult } from '../models/IAuthResult';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connected-user',
  templateUrl: './connected-user.component.html',
  styleUrls: ['./connected-user.component.scss']
})
export class ConnectedUserComponent implements OnInit {

  constructor(private _as : AuthService, private _route : Router) {}
  connectedUser : IUser | undefined 
  
  logOut() : void {
    this._as.logout() 
    
  }
  ngOnInit(): void {
    this._as.getConnectedUser()
    this._as.$connectedUser.subscribe({
      next : (user : IUser | undefined) => {
        this.connectedUser = user
      }
    })
  }
}
