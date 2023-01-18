import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent {
 eventForm : FormGroup
 // TODO : build guard(?) in the case we are in form and disconnect cf : my-events
// TODO : vuild validators
 constructor(private _fb : FormBuilder, private _es : EventService, private _route : Router) {
  this.eventForm = this._fb.group({
    name : [null, []],
    description : [null, []],
    startDate : [null, []],
    endDate : [null, []],
    maxGuest : [null, []],
  })
 }

 createEvent() : void {
  if(this.eventForm.valid){
    this._es.createEvent(this.eventForm.value)
    this._route.navigateByUrl('/my-events')
  } else this.eventForm.markAllAsTouched()
 }
}
