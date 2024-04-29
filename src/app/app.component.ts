import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { TodoHeadComponent } from './components/todo-head/todo-head.component';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AddTodoComponent,
    TodoHeadComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
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
