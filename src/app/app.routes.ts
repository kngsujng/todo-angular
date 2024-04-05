import { Routes } from '@angular/router';
import { TodosCanbanComponent } from './components/todos-canban/todos-canban.component';
import { TodosListComponent } from './components/todos-list/todos-list.component';

export const routes: Routes = [
  { path: '', component: TodosListComponent },
  { path: 'canban', component: TodosCanbanComponent },
];
