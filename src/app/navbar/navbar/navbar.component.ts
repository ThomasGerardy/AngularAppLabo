import { Component } from '@angular/core';
import { ILink } from 'src/app/models/ILinks';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  links : ILink[] = [
    { title : 'Accueil', url : '/' },
    { title : 'Les évènements', url : '/events' },

  ]

}