import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  decodeToken(token : string) : any{
    let decoded : any = jwt_decode(token, { header : false})
    return decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
  }
}
