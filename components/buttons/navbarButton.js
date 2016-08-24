/**
 * @providesModule NavbarButton
 */

import React, { PropTypes } from 'react';
import ReactNative from 'react-native';

import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native';

export default class NavbarButton extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        text: PropTypes.string,
        action: PropTypes.func
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={() => {
                if (this.props.action) {
                    this.props.action();
                }
            }}>
                <View style={styles.container}>
                    <Text style={styles.text}>{this.props.text}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

var styles = StyleSheet.create({
  container: {
    height: 50,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 17
  }
});
