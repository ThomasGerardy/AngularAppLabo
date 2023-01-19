import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/services/event.service';
import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {
  formGuest : FormGroup
  displaySucces : boolean = false
  constructor(private _fb : FormBuilder, private _rs : RegistrationService, private _route : ActivatedRoute, private _router : Router, private _es : EventService) {
    this.formGuest = this._fb.group({
      nbGuest : [null, [Validators.required]]
    })
  }
  join() : void {
    this._route.params.subscribe({
      next : (res) => {
        if(this.formGuest.valid){
          this._rs.join(parseInt(res['id']), this.formGuest.value)
        }
        this.formGuest.markAllAsTouched()
      }, 
      error : err => console.log(err)
      
    })
    
  }
  //TODO : Revoir => le message doit s'afficher si on est déjà inscrit à l'event et direct après l'inscription ! 
  ngOnInit(): void {
    this._es.getAllMyEvents()
    this._es.$myEvents.subscribe({
      next : (res) => {
        this._route.params.subscribe({
          next : (param) => { 
            this.displaySucces = res?.includes(param['id']) ?? false
          }
        })
      }
    })
  }
}
