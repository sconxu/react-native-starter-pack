/**
* @providesModule GlobalActions
*/

'use strict'

import { Actions } from 'react-native-router-flux';
import * as ErrorMessages from 'ErrorMessages';

export const actions = {
    INITIALIZE: 'initialize',
    SET_INTERNET_CONNECTIVITY: 'set_internet_connectivity',
    REHYDRATION_COMPLETE: 'rehydration_complete'
};

export function initialize() {
    return (dispatch, getState) => {
        const internetConnectivity = getState().global.get('internetConnectivity');

        if (! internetConnectivity ) {
            Actions.errorModal({data: ErrorMessages.internetConnectivity});


        }

        return;
    }
}

export function setInternetConnectivity(value) {
    return {
        type: actions.SET_INTERNET_CONNECTIVITY,
        payload: value
    };
}
