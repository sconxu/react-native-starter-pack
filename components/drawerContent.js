/**
 * @providesModule DrawerContent
 */

'use strict';

import React, { PropTypes } from 'react';

import {
    View,
    StyleSheet,
    ListView,
    TouchableHighlight,
    Image,
    Text
} from 'react-native';
import * as navbarActions from 'NavbarActions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Map } from 'immutable';
import { Actions } from 'react-native-router-flux';

var DrawerItem = React.createClass({
    propTypes: {
        text: PropTypes.string,
        onItemSelected: PropTypes.func
    },

    onPress(data) {
        this.props.onItemSelected(data);
    },

    render() {
        return (
            <TouchableHighlight
            style={styles.drawerItemContainer}
            underlayColor='lightgrey'
            onPress={() => this.onPress(this.props.text)}
            >
            <Text style={styles.drawerItem}>{this.props.text}</Text>
            </TouchableHighlight>
        )
    }
});

class DrawerContent extends React.Component {
    static contextTypes = {
        drawer: PropTypes.object,
    };

    constructor(props) {
        super(props);

        this.onItemSelected = this.onItemSelected.bind(this);
        this.renderRow = this.renderRow.bind(this);
    }

    componentWillReceiveProps(nextProps) {

    }

    onItemSelected(data) {
        this.context.drawer.close();

        console.log(data);
    }

    renderRow(data) {
        return (
            <DrawerItem text={data} onItemSelected={this.onItemSelected}/>
        );
    }

    render() {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        let dataSourceArray = ['Option-1', 'Option-2']

        return (
            <View>
                <ListView
                    style={styles.drawerContentContainer}
                    dataSource={ds.cloneWithRows(dataSourceArray)}
                    renderRow={this.renderRow}
                />
            </View>
        )
    }
}

var styles = StyleSheet.create({
    drawerContentContainer: {
        backgroundColor: 'white'
    },
    drawerItemContainer: {
        height: 50,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderColor: 'lightgrey',
        marginLeft: 5,
        marginRight: 5,
        paddingLeft: 5
    },
    drawerItem: {

    },
    userInfoContainer: {
        padding: 10,
        backgroundColor: 'darkgrey'
    },
    userPictureContainer: {
        marginBottom: 10,
        width: 100,
        height: 100,
        borderRadius: 50,
        overflow: 'hidden',
        alignSelf: 'center'
    },
    userPicture: {
        width: 100,
        height: 100
    },
    welcomeTextContainer: {
        alignSelf: 'center'
    },
    welcomeText: {
        fontSize: 20,
        color: 'lightgrey'
    }
});

const actions = [
    navbarActions
];

function mapStateToProps(state) {
    return {
        user: state.user
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

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);
