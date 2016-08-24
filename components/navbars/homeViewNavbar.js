/**
 * @providesModule HomeViewNavbar
 */

'use strict';

import React, { PropTypes } from 'react';
import NavbarBase from 'NavbarBase';
import * as navbarActions from 'NavbarActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';


class HomeViewNavbar extends NavbarBase {
    static contextTypes = {
        drawer: PropTypes.object,
    };

    constructor(props) {
        super(props);
    }

    render() {
        this.toggleDrawer = this.context.drawer.toggle;

        return super.render();
    }
}

const actions = [
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeViewNavbar);
