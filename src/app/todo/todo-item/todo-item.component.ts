import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../model/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { ToggleTodoAction, EditarTodoAction, BorrarTodoAction } from '../todo.actions';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html'
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  editando: boolean;
  checkField: FormControl;
  txtInput: FormControl;
  @ViewChild('txtInputFisico') txtInputFisico: ElementRef;
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.checkField = new FormControl(this.todo.completado);
    this.txtInput = new FormControl(this.todo.texto, Validators.required);

    this.checkField.valueChanges.subscribe(() => {
      const action = new ToggleTodoAction(this.todo.id);
      this.store.dispatch(action);
    });
  }

  editar() {
    this.editando = true;
    setTimeout(() => {
      this.txtInputFisico.nativeElement.select();
    }, 1);
  }

  terminarEdicion() {

    if (this.txtInput.value === this.todo.texto){
    this.editando = false;
    return;
    }
    if ( this.txtInput.value !== '') {
    const action = new EditarTodoAction(this.todo.id, this.txtInput.value);
    this.store.dispatch(action);
    this.editando = false;
    } else {
      this.editando = false;
    }
  }
  borrarTodo() {
    const action = new BorrarTodoAction(this.todo.id);
    this.store.dispatch(action);
  }

}
