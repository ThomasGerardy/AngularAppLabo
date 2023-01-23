import { Injectable } from '@angular/core';
import { ILink } from '../models/ILinks';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUrl } from '../models/IUrl';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
 
  constructor(private _router : Router) { }
  
  links : ILink[] = [
    { title : '	⌂ Accueil ', url : '/', selected : 'selected' },
    { title : ' ♦ Evenements ', url : '/all-events' },
    { title : ' ♣ Mes évènements ', url : '/my-events' },
    { title : ' ♥ Je participe ', url : '/event-joined' }
  ]

  changeSelected(i : number) : void{
    this.links.forEach( l => l.selected = '')
    this.links[i].selected = 'selected'
  
  }

  foundI() : Observable<number> {
    let url : Observable<number> = new Observable<number>( observer => {
      if(this._router.routerState.snapshot.url.includes('all-events'))
        observer.next(1)
      else if (this._router.routerState.snapshot.url.includes('my-events'))
        observer.next(2)
      else if (this._router.routerState.snapshot.url.includes('event-joined'))
        observer.next(3)
      else 
        observer.next(0)
    })
   
    return url
  }
}