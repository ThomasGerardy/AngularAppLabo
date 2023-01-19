import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ILogin } from '../models/ILogin';
import { IRegister } from '../models/IRegister';
import { IAuthResult } from '../models/IAuthResult';
import { JwtService } from './jwt.service';
import { Token } from '@angular/compiler';
import { IUser } from '../models/IUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _url : string = 'https://localhost:7245/api/'

  private _$connectedUser : Subject<IUser |undefined> = new Subject<IUser | undefined>()

  $connectedUser : Observable<IUser | undefined> = this._$connectedUser.asObservable()
  
  constructor(private _httpClient : HttpClient, private _jwt : JwtService) {}

  login(loginForm : ILogin) : void{
    this._httpClient.post<IAuthResult>(this._url + 'Auth/Login', loginForm).subscribe({
      next : (res) => {
        localStorage.setItem('token', res.token)
        localStorage.setItem('userId', this._jwt.getUserIdFormToken(res.token))
        this._httpClient.get<IUser>(this._url + 'Member/' + localStorage.getItem('userId')).subscribe({
          next : (response) => {
            this._$connectedUser.next(response)
          }
        })
      },
      error : (err) => {
        this._$connectedUser.next(undefined)
        console.log(err) //TODO : Enlever le console log
      }

    })
  }

  register(register : IRegister) : void {
    this._httpClient.post<IAuthResult>(this._url + 'Auth/Register', register).subscribe({
      next : (res) => {
        localStorage.setItem('token', res.token)
        localStorage.setItem('userId', this._jwt.getUserIdFormToken(res.token))
        this._httpClient.get<IUser>(this._url + 'Member/' + localStorage.getItem('userId')).subscribe({
          next : (response) => {
            this._$connectedUser.next(response)
          }
        })
      }, 
      error : (err) => {
        console.log(err);
        this._$connectedUser.next(undefined)
        
      }
    })
  }

  logout() : void {
    this._$connectedUser.next(undefined)
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
  }
  getConnectedUser() : void {
    let userId : number | null = parseInt(localStorage.getItem('userId') ?? '')
    if(userId){
      this._httpClient.get<IUser>(this._url + 'Member/' + userId).subscribe({
        next : (res) => {
          this._$connectedUser.next(res)
        },
        error : () => {
          this._$connectedUser.next(undefined)
        }
      })
    } else  this._$connectedUser.next(undefined) 
  }
}
 