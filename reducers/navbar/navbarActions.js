/**
 * @providesModule NavbarActions
 */

'use strict';

import { Actions } from 'react-native-router-flux';

export const actions = {
    SET_NAVBAR_DETAIL: 'set_navbar_details'
};

export function setNavbarDetail(type) {
    return (dispatch, getState) => {
        switch (type) {
            case 'page1':
                var value = {
                    title: 'PAGE 1 TITLE',
                }

                dispatch({
                    type: actions.SET_NAVBAR_DETAIL,
                    payload: {
                        detail: type,
                        value: value
                    }
                });

                break;
            default:
        }
    }
}
