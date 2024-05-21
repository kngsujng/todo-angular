import { Injectable, computed, signal } from "@angular/core";
import { TodoItem } from "../models";

@Injectable({
  providedIn: 'root'
})
export class TodoState{
  
  private readonly _todos = signal<TodoItem[]|null>(null);

  readonly todos = computed(() => this._todos());

  initByFirebaseTodos(todos: TodoItem[]) {
    this._todos.set(todos);
  }
}