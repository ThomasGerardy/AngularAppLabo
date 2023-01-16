import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  getUserIdFormToken(token : string | null) : any{
    let decoded : any
    if(token)
      decoded = jwt_decode(token, { header : false})
    return decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
  }
}
