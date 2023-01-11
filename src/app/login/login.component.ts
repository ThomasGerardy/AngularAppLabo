import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginForm : FormGroup

  constructor(private _fb : FormBuilder, private _authService : AuthService, private _route : Router) {
    this.loginForm = this._fb.group({
      identifier : [null, [Validators.required]],
      password : [null, [Validators.required]]
    })
  }

  ngOnInit(): void {
    this._authService.$connectedUser.subscribe({
      next : (res) => {
        if(res){
          this._route.navigateByUrl('/')
          console.log(res)
        }
      }
    })
  }

  login() : void{
    if(this.loginForm.valid)
    {
      this._authService.login(this.loginForm.value)
    }
    else this.loginForm.markAllAsTouched()
  }
}
