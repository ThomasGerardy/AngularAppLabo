import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  registerForm : FormGroup

  constructor(private _fb : FormBuilder, private _as : AuthService, private _route : Router) {
    this.registerForm = this._fb.group({
      pseudo : [null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email : [null, [Validators.required, Validators.email]],
      password : [null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W|_]).+$/)]]
    })
  }
 // ça marche ap
  register() : void{
    if(this.registerForm.valid)
    {      
      this._as.register(this.registerForm.value)
      this._route.navigateByUrl('/all-events')
    }
    else this.registerForm.markAllAsTouched()
    
  } 
  ngOnInit(): void {
    this._as.$connectedUser.subscribe({
      next : (res) => { 
        if(res)
          this._route.navigateByUrl('/all-events')
      }
    })
  }
}
