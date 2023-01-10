import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ILogin } from '../models/ILogin';
import { IRegister } from '../models/IRegister';
import { IAuthResult } from '../models/IAuthResult';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _url : string = 'https://localhost:7245/api/'

  private _$connectedUser : Subject<IAuthResult |undefined> = new Subject<IAuthResult | undefined>()

  $connectedUser : Observable<IAuthResult | undefined> = this._$connectedUser.asObservable()
  
  constructor(private _httpClient : HttpClient) { }

  login(loginForm : ILogin) : void{
    this._httpClient.post<IAuthResult>(this._url + '/Auth/Login', loginForm).subscribe({
      next : (res) => {
        this._$connectedUser.next(res)
        localStorage.setItem('token', res.token)
        //TODO Decripter le token pour stocké le user dans le local storage
      },
      error : (err) => {
        this._$connectedUser.next(undefined)
        console.log(err) //TODO : Enlever le console log
      }
    })
  }

  register(register : IRegister) : void {
    this._httpClient.post<IAuthResult>(this._url + '/Auth/Register', register).subscribe({
      next : (res) => {
        this._$connectedUser.next(res)
        localStorage.setItem('token', res.token)
        //TODO: Decripter token + stocker
      }, 
      error : (err) => {
        this._$connectedUser.next(undefined)
        console.log(err) //TODO : enlever ça
      }
    })
  }

  logout() : void {
    this._$connectedUser.next(undefined)
    localStorage.removeItem('token')
    // localStorage.removeItem('userId') -> pour quand j'aurai réglé l'histoire du token
  }
}
