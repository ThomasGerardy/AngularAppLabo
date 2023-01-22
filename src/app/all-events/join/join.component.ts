import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IEvent } from 'src/app/models/IEvent';
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
  constructor(private _fb : FormBuilder, private _rs : RegistrationService, private _route : ActivatedRoute, private _es : EventService, private _router : Router) {
    this.formGuest = this._fb.group({
      nbGuest : [null, [Validators.required]]
    })
  }
  join() : void {
    this._route.params.subscribe({
      next : (res) => {
        if(this.formGuest.valid){
          this._rs.join(parseInt(res['id']), this.formGuest.value)
          this._router.navigateByUrl('/event-joined')
        }
        this.formGuest.markAllAsTouched()
      }, 
      error : err => console.log(err)
    })
  }
 
  ngOnInit(): void {
    // this._es.getAllMyEvents()
    let id : number = parseInt(this._route.snapshot.params['id'])
    this._es.$myEvents.subscribe({
      next : res => this.displaySucces = res?.some( e => e.id === id) ?? false
    })
  }
}
