import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { LoginPage, TodoListPage, TodoCanbanPage, TodoCalendarPage, TodoMapPage, NotFoundPage } from 'src/pages';
import { DashboardLayout } from './layouts/dashboard';

export const routes: Routes = [
  {
    path:'',
    redirectTo : 'login',
    pathMatch:'full'
  },
  {
    path:'login',
    component: LoginPage, 
    canActivate: [LoginGuard]
  },
  {
    path:'',
    component: DashboardLayout,
    children: [
      { path: 'list', component: TodoListPage },
      { path: 'canban', component: TodoCanbanPage },
      { path: 'calendar', component: TodoCalendarPage },
      { path: 'map', component: TodoMapPage },
    ], 
    canActivate: [AuthGuard]
  }, 
  {
    path: '**', 
    component: NotFoundPage
  }
];
