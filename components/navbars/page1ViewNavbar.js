/**
 * @providesModule Page1ViewNavbar
 */

import React from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import NavbarBase from './navbarBase';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';

class Page1ViewNavbar extends NavbarBase {
    constructor(props) {
        super(props);

        this.state = {
            title: this.props.title,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            title: nextProps.title,
        });
    }

    renderMiddleComponent() {
        return (
            <Text>{this.state.title}</Text>
        );
    }
}

const actions = [
];

function mapStateToProps(state) {
    return {
        title: state.navbar.details.get('page1').title,
    };
}

function mapDispatchToProps(dispatch) {
    const creators = Map()
    .merge(...actions)
    .filter(value => typeof value === 'function')
    .toObject();

    return {
        actions: bindActionCreators(creators, dispatch),
        dispatch
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Page1ViewNavbar);
