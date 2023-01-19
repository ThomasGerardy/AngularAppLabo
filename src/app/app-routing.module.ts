import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllEventsComponent } from './all-events/all-events.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyEventsComponent } from './my-events/my-events.component';
import { RegisterComponent } from './register/register.component';
import { LoginActivateGuard } from './guard/login-activate.guard';
import { CreateEventComponent } from './create-event/create-event.component';
import { JoinComponent } from './all-events/join/join.component';
import { EventJoinedComponent } from './event-joined/event-joined.component';

const routes: Routes = [
  { path : '', component : HomeComponent },
  { path : 'login', component : LoginComponent },
  { path : 'register', component : RegisterComponent },
  { path : 'all-events', component : AllEventsComponent},
  { path : 'my-events', component : MyEventsComponent, canActivate : [LoginActivateGuard]},
  { path : 'create-event', component : CreateEventComponent },
  { path : 'join/:id', component : JoinComponent},
  { path : 'event-joined', component : EventJoinedComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
