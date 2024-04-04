import { Component, EventEmitter, Input, Output } from '@angular/core'
import { type TodoItem } from '../../model/todo'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {
  editedInputVal: string = ''
  @Input() todo: TodoItem = { id: '', todo: '', isCompleted: false, isEditing: false }
  @Output() deleteItemEvent = new EventEmitter<string>()
  @Output() toggleItemEvent = new EventEmitter<string>()
  @Output() editItemEvent = new EventEmitter<string>()

  removeItem(id: string) {
    this.deleteItemEvent.emit(id)
  }

  toggleItem(id: string) {
    this.toggleItemEvent.emit(id)
  }

  editItem() {
    this.editItemEvent.emit(this.editedInputVal)
  }
}
