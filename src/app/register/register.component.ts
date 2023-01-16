import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm : FormGroup

  constructor(private _fb : FormBuilder, private _as : AuthService) {
    this.registerForm = this._fb.group({
      pseudo : [null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email : [null, [Validators.required, Validators.email]],
      password : [null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W|_]).+$/)]]
    })
  }

  register() : void{
    if(this.registerForm.valid)
      this._as.register(this.registerForm.value)
    else this.registerForm.markAllAsTouched()
  }
}
