/**
 * @providesModule NavbarBase
 */

'use strict';

import React, { PropTypes } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TouchableWithoutFeedback
} from 'react-native';

import Config from 'Config';
import NavbarButton from 'NavbarButton';
import { Actions } from 'react-native-router-flux';

export default class NavbarBase extends React.Component {
    constructor(props) {
        super(props);
    }

    renderBackButton() {
        return (
            <NavbarButton
                action={Actions.pop}
                text='Back'
            />
        );
    }

    toggleDrawer() {}

    renderDrawerButton() {
        return (
            <TouchableWithoutFeedback onPress={this.toggleDrawer}>
                <View style={{justifyContent: 'center'}}>
                    <Text>=</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    renderLeftComponent() {
        // render left component based on its type
        switch (typeof this.props.leftComponent) {
            // if we have an object it should be a React Component
            case 'object':
                return this.props.leftComponent;
            // might've sent a render function by mistake, be nice and call it
            case 'function':
                return this.props.leftComponent();
            // if we have a string it should always be 'back'
            case 'string':
                if (this.props.leftComponent === 'back') {
                    return this.renderBackButton();
                }
            // in any other case render drawer button, a drawer is always useful
            default:
                return this.renderDrawerButton();
        }
    }

    renderRightComponent() {
        return null;
    }

    renderLogo() {
        return (
            <Text>logo</Text>
        );
    }

    renderMiddleComponent() {
        // render left component based on its type
        switch (typeof this.props.middleComponent) {
            // if we have an object it should be a React Component
            case 'object':
                return this.props.middleComponent;
            // might've sent a render function by mistake, be nice and call it
            case 'function':
                return this.props.middleComponent();
            // if we have a string it should always be the scene title
            case 'string':
                if (this.props.leftComponent === 'title') {
                    return this.renderBackButton();
            }
            // in any other case render drawer button, a drawer is always useful
            default:
                return this.renderLogo();
        }
    }

    renderNavbar() {
        return (
            <View style={styles.header}>
                <View style={styles.container}>
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    {this.renderLeftComponent()}
                  </View>
                  <View>
                    {this.renderMiddleComponent()}
                  </View>
                  <View style={{flex: 1, justifyContent: 'center'}}>
                    {this.renderRightComponent()}
                  </View>
                </View>
            </View>
        );
    }

    render() {
        let state = this.props.navigationState;
        let selected = state.children[state.index];

        if (selected.hideNavBar) {
            return null
        }

        return this.renderNavbar();
    }
};

const styles = StyleSheet.create({
    header: {
        top: 0,
        left: 0,
        right: 0,
        paddingTop: 0,
        position: 'absolute',
    },
    container: {
        height: Config.navbarHeight,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'darkgrey',
        paddingTop: 20,
        paddingLeft: 10,
        paddingRight: 10
    },
    logo: {
        alignSelf: 'center',
        height: 30
    },
    menuIcon: {
        width: 20,
        height: 20
    }
});
