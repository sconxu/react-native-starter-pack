/**
 * @providesModule CombineReducers
 */

'use strict';

import { combineReducers } from 'redux';
import global from 'GlobalReducer';
import navbar from 'NavbarReducer';

export default combineReducers({
    global,
    navbar
});
