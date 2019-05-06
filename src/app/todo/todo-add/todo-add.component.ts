import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { AgregarTodoAction } from '../../../../.history/src/app/todo/todo.actions_20190503202251';

@Component({
  selector: 'app-todo-add',
  templateUrl: './todo-add.component.html'
})
export class TodoAddComponent implements OnInit {
  txtImput: FormControl;
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.txtImput = new FormControl('', Validators.required);
  }

  agregarTodo() {
    if (this.txtImput.invalid) {
      return;
    }

    const accion = new AgregarTodoAction(this.txtImput.value);
    this.store.dispatch(accion);

  }
}
