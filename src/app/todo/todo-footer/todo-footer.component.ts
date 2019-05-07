import { Component, OnInit } from '@angular/core';
import { filtrosValidos, SetFiltroAction } from 'src/app/filter/filter.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { Todo } from '../model/todo.model';
import { BorrarAllTodoAction } from '../../../../.history/src/app/todo/todo.actions_20190506224201';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html'
})
export class TodoFooterComponent implements OnInit {
  pendientes: number;
  filtroActual: filtrosValidos;
  filtrosValidos: filtrosValidos[] = ['todos', 'completados', 'pendientes']
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.subscribe(state => {
      this.contarPendientes(state.todos);
      this.filtroActual = state.filtro;
    });
  }

  cambiarFiltro(filtro: filtrosValidos) {
    const accion = new SetFiltroAction(filtro);
    this.store.dispatch(accion);
  }

  contarPendientes(todos: Todo[]) {
    this.pendientes = todos.filter(todo => !todo.completado).length;
  }

  limpiarTodos() {
    const action = new BorrarAllTodoAction();
    this.store.dispatch(action);
  }

}
