import { Component } from '@angular/core';
import { ILink } from 'src/app/models/ILinks';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
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
}
