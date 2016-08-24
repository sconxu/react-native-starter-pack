/**
* @providesModule GlobalReducer
*/

'use strict';

import { actions } from './globalActions';
import Immutable from 'immutable';
import { ActionConst } from 'react-native-router-flux';

const InitialState = Immutable.Record({
    internetConnectivity: true,
    currentSceneKey: '',
    previousSceneKey: '',
    previousEvent: '',
    rehydrationComplete: false
});

const initialState = new InitialState;

export default function global(state = initialState, action) {
    if (!(state instanceof InitialState)) return initialState.merge(state);

    switch (action.type) {
        case ActionConst.FOCUS: {
            const previousSceneKey = state.get('previousSceneKey');
            const previousEvent = state.get('previousEvent');

            if (previousSceneKey === action.scene.sceneKey && previousEvent === ActionConst.BACK) {
                return state
                    .set('previousEvent', ActionConst.FOCUS);
            }

            const currentSceneKey = state.get('currentSceneKey');
            const newState = currentSceneKey ? state.set('previousSceneKey', currentSceneKey) : state;

            return newState.set('currentSceneKey', action.scene.sceneKey)
                .set('previousEvent', ActionConst.FOCUS);
        }
        case ActionConst.BACK_ACTION:
        case ActionConst.BACK: {
            const previousSceneKey = state.get('currentSceneKey');
            const currentSceneKey = state.get('previousSceneKey');

            return state.set('currentSceneKey', currentSceneKey)
                .set('previousSceneKey', previousSceneKey)
                .set('previousEvent', ActionConst.BACK);
        }
        case actions.SET_INTERNET_CONNECTIVITY:
            return state.set('internetConnectivity', action.payload);
        case actions.REHYDRATION_COMPLETE:
            return state.set('rehydrationComplete', true);
        default:
            return state;
    }
}
