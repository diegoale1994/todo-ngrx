import * as fromFiltro from './filter/filter.actions';
const estadoInicial: fromFiltro.filtrosValidos = 'todos';

export function filtrosReducer(state = estadoInicial, action: fromFiltro.acciones): fromFiltro.filtrosValidos {
    switch (action.type) {
        case fromFiltro.SET_FILTRO:
            return action.filtro;
        default:
        return state;
    }
}
