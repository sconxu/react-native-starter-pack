/**
* @providesModule ConstructStore
*/


import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducers from 'CombineReducers';
import {persistStore, autoRehydrate} from 'redux-persist';
import {AsyncStorage} from 'react-native';
import { actions as globalActions } from 'GlobalActions';

export default function(initialState) {
    const enhancer = compose(
        applyMiddleware(thunk)
    );

    var store =  createStore(reducers, initialState, enhancer);
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
