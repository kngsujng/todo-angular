import { Routes } from '@angular/router';
import { TodosCanbanComponent } from './components/todos-canban/todos-canban.component';
import { TodosListComponent } from './components/todos-list/todos-list.component';
import { TodosCalendarComponent } from './components/todos-calendar/todos-calendar.component';

export const routes: Routes = [
  { path: '', component: TodosListComponent },
  { path: 'canban', component: TodosCanbanComponent },
  { path: 'calendar', component: TodosCalendarComponent },
];
