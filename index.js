/**
* @providesModule Index
*/

'use strict';

import React from 'react';
import {
    BackAndroid,
    NetInfo,
    NativeModules,
    Navigator,
    StatusBar,
    Text,
    View,
    Platform
} from 'react-native';
import {
    Modal,
    Reducer,
    Router,
    Scene
} from 'react-native-router-flux';
import { Provider, connect } from 'react-redux';
import constructStore from 'ConstructStore';
import NavigationDrawer from 'NavigationDrawer';
import HomeView from 'HomeView';
import Page1View from 'Page1View';
import Page2View from 'Page2View';
import Navbar from 'HomeViewNavbar';
import ErrorModal from 'ErrorModal';
import InfoModal from 'InfoModal';
import { setDebugState as globalSetDebugState } from 'GlobalActions';
import { setInternetConnectivity } from 'GlobalActions';
import * as ErrorMessages from 'ErrorMessages';
import { Actions } from 'react-native-router-flux';

const RouterWithRedux = connect()(Router);

function initialDebugState() {
    const state = {

    };

    return state;
}

const store = constructStore(initialDebugState());

export default class Index extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        if (Platform.OS === 'ios') {
            StatusBar.setBarStyle('light-content');
        } else if (Platform.OS === 'android'){
            StatusBar.setBackgroundColor('transparent', false);
            StatusBar.setTranslucent(true);
        }
    }

    componentDidMount() {
        NetInfo.addEventListener(
            'change',
            this.handleConnectionInfoChange
        );

        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress', function() {
                return Actions.pop();
            });
        }
    }

    componentWillUnmount() {
        NetInfo.removeEventListener(
            'change',
            this._handleConnectionInfoChange
        );
    }

    handleConnectionInfoChange(connectionInfo) {
        var internetConnectivity = true;

        if (connectionInfo === 'none' || connectionInfo === 'unknown') {
            internetConnectivity = false;
            Actions.errorModal({data: ErrorMessages.internetConnectivity});
        }

        store.dispatch(setInternetConnectivity(internetConnectivity));
    }

    render() {
        var marginTop = Platform.os === 'ios' ? Navigator.NavigationBar.Styles.General.TotalNavHeight : 64;

        return (
            <Provider store={store}>
                <RouterWithRedux>
                    <Scene key='modal' component={Modal} hideNavBar={true}>
                        <Scene key='root' hideNavBar={false}>
                            <Scene key='navigationDrawer' initial={false} component={NavigationDrawer} hideNavBar={true}>
                                <Scene key='main' navBar={Navbar}>
                                    <Scene key='home' component={HomeView} title='HomeView' sceneStyle={{marginTop: marginTop}}/>
                                    <Scene key='page1' component={Page1View} initial={true} title='Page1View' sceneStyle={{marginTop: marginTop}}/>
                                    <Scene key='page2' component={Page2View} title='Page2View' sceneStyle={{marginTop: marginTop}}/>
                                </Scene>
                            </Scene>
                        </Scene>
                        <Scene
                            key='errorModal'
                            component={ErrorModal}
                            title='ErrorModal'
                            hideNavBar={true}
                        />
                        <Scene
                            key='infoModal'
                            initial={false}
                            component={InfoModal}
                            title='InfoModal'
                            hideNavBar={true}
                        />
                    </Scene>
                </RouterWithRedux>
            </Provider>
        );
    }
}
