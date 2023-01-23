import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ILink } from 'src/app/models/ILinks';
import { UrlService } from 'src/app/services/url.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  links : ILink[] = this._us.links
  i : number = 0
  constructor(private _route : Router, private _us : UrlService){}

  ngOnInit(): void {
  }
  changeSelected(i : number) : void {
    this._us.changeSelected(i)
  }

  
}
