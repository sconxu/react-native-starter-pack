/**
* @providesModule ConstructStore
*/


import { createStore, applyMiddleware, compose } from 'redux';
import reducers from 'CombineReducers';
import {persistStore, autoRehydrate} from 'redux-persist';
import {AsyncStorage} from 'react-native';
import { actions as globalActions } from 'GlobalActions';

export default function(initialState) {
    var store =  createStore(reducers, initialState);
    var persistor = persistStore(
        store,
        {
            storage: AsyncStorage,
            whitelist: []
        },
        () => {
            store.dispatch({
                type: globalActions.REHYDRATION_COMPLETE
            });
        }
    );

    return store;
}
