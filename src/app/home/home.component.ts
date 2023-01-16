import { Component, OnInit } from '@angular/core';
import { IAuthResult } from '../models/IAuthResult';
import { AuthService } from '../services/auth.service';
import { IUser } from '../models/IUser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  connectedUser : IUser |undefined

  constructor(private _as : AuthService) {}
  
  ngOnInit(): void {
    this._as.getConnectedUser()
    this._as.$connectedUser.subscribe({
      next : (user : IUser | undefined) => { this.connectedUser = user },
      error : () => { this.connectedUser = undefined }
    })
  }

  logout() : void {
    this._as.logout()
  }
}
