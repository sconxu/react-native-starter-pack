/**
 * @providesModule SplashScreenView
 */

'use strict';

import React from 'react';
import {
  AppRegistry,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import * as deviceActions from '../reducers/device/deviceActions';
import * as globalActions from '../reducers/global/globalActions';
import * as userActions from 'UserActions';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';

class SplashScreenView extends React.Component {
  constructor(props) {
    super(props);
  }

  static renderNavigatonBar() {
      return null;
  }

  componentWillReceiveProps(nextProps) {
      if (nextProps.rehydrationComplete) {
          this.props.actions.registerDevice()
          .then(() => {
              this.props.actions.initialize();
          })
          .then((result) => {
              this.props.actions.updateUserPicture();
              Actions.navigationDrawer({
                  type: 'replace'
              });
          })
          .done();
      }
  }

  componentWillMount() {
  }

  render() {
    return (
        <View displayName="WelcomeContainer" style={styles.welcomeContainer}>
            <Image
            source={require('../Images/logo.png')}
            resizeMode='contain'
            />
        </View>
    );
  }
}

var styles = StyleSheet.create({
    welcomeContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black'
    }
});

const actions = [
  globalActions
];

function mapStateToProps(state) {
    return {
        rehydrationComplete: state.global.get('rehydrationComplete')
    };
}

function mapDispatchToProps(dispatch) {
  const creators = Map()
    .merge(...actions)
    .filter(value => typeof value === 'function')
    .toObject();

  return {
    actions: bindActionCreators(creators , dispatch),
    dispatch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
