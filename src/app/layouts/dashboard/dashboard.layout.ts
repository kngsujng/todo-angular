import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AddTodoComponent } from 'src/features/todo/components/add-todo/add-todo.component';
import { TodoHeadComponent } from 'src/entities/todo/components/todo-head/todo-head.component';
import { TodoService } from 'src/entities/todo/services/todo.service';
import { LogoutButtonComponent } from 'src/features/todo/components/logout-button/logout-button.component';

@Component({
  selector: 'app-layout',
  standalone: true,
    imports: [RouterOutlet, TodoHeadComponent, AddTodoComponent, LogoutButtonComponent],
  templateUrl: './dashboard.layout.html',
  styleUrl: './dashboard.layout.scss'
})
export class DashboardLayout {
  printContent!: HTMLElement | null ;
  initBody!: string;

  constructor(
      private todoService: TodoService,
      public router: Router,
    ) {}

  onAddTodo(newTodo: string, location: string) {
    this.todoService.onAddTodo(newTodo, location);
  }

  handlePrint(){
    this.printContent = document.getElementById('printArea') as HTMLElement;
    window.onbeforeprint = this.beforePrint.bind(this);
	  window.onafterprint = this.afterPrint.bind(this);
    window.print();
  }

  private beforePrint(){
    this.initBody = document.body.innerHTML;
    document.body.innerHTML = this.printContent?.innerHTML as string;
  }

  private afterPrint(){
    document.body.innerHTML = this.initBody;
    location.reload();
  }
}
