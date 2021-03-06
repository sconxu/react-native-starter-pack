/**
  * @providesModule Page1View
  */

'use strict';

import React, { PropTypes } from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';

import Navbar from 'Page1ViewNavbar';

import * as navbarActions from 'NavbarActions';

class Page1View extends React.Component {
    constructor(props) {
        super(props);

        this.setNavbarDetail = this.setNavbarDetail.bind(this);
    }

    componentWillMount() {
        this.setNavbarDetail(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.setNavbarDetail(nextProps);
    }

    setNavbarDetail(props) {
        props.actions.setNavbarDetail('page1');
    }

    static renderNavigationBar(props) {
        return <Navbar leftComponent='back' {...props} />
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>page 1</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

const actions = [
    navbarActions
];

function mapStateToProps(state) {
    return {
        
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

export default connect(mapStateToProps, mapDispatchToProps)(Page1View);
