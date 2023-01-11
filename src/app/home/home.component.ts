import { Component, OnInit } from '@angular/core';
import { IAuthResult } from '../models/IAuthResult';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
 connectedUser : IAuthResult | undefined

  constructor(private _authService : AuthService) {}
  
  ngOnInit(): void {
    this._authService.$connectedUser.subscribe({
      next : (user : IAuthResult | undefined) => {
        this.connectedUser = user
      },
      error : (err) => {
        console.log(err)
      }
      
    })
  }
}
