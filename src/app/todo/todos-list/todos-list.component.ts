import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import { Todo } from '../model/todo.model';
import { filtrosValidos } from 'src/app/filter/filter.actions';


@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html'
})
export class TodosListComponent implements OnInit {
  todos: Todo[] = [];
  constructor(private store: Store<AppState>) { }
  filtro: filtrosValidos;

  ngOnInit() {
    this.store.subscribe(state => {
      this.todos = state.todos;
      this.filtro = state.filtro;
    });
  }

}
