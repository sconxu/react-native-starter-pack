/**
 * @providesModule Config
 */

'use strict';

import {
    Platform
} from 'react-native';

export default class Config {
    static get navbarHeight() {
        return Platform.OS === 'ios' || Platform.Version > 19 ? 64 : 44
    }

    static get optionsBarHeight() {
        return 50;
    }
}
