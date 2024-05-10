import { Routes } from '@angular/router';
import { TodosCanbanComponent } from './components/todos-canban/todos-canban.component';
import { TodosListComponent } from './components/todos-list/todos-list.component';
import { TodosCalendarComponent } from './components/todos-calendar/todos-calendar.component';
import { NaverMapComponent } from './components/naver-map/naver-map.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

export const routes: Routes = [
  {
    path:'',
    redirectTo : 'login',
    pathMatch:'full'
  },
  {
    path:'login',
    component: LoginComponent, 
    canActivate: [LoginGuard]
  },
  {
    path:'',
    component: LayoutComponent,
    children: [
      { path: 'list', component: TodosListComponent },
      { path: 'canban', component: TodosCanbanComponent },
      { path: 'calendar', component: TodosCalendarComponent },
      { path: 'map', component: NaverMapComponent },
    ], 
    canActivate: [AuthGuard]
  }, 
  {
    path: '**', 
    component: NotFoundComponent
  }
];
