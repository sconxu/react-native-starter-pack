/**
* @providesModule NavbarReducer
*/


'use strict';

import { actions } from 'NavbarActions';
import Immutable from 'immutable';

const InitialState = Immutable.Record({
    drawerOpen: false,
    details: Immutable.Map({})
});

const initialState = new InitialState;

export default function navbar(state = initialState, action) {
    if (!(state instanceof InitialState)) return initialState.merge(state);

    switch (action.type) {
        case actions.SET_NAVBAR_DETAIL:
            if (action.payload) {
                const { detail, value } = action.payload;

                return state.setIn(['details', detail], value);
            }

            return state;

        default:
            return state;
    }
}
