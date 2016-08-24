/**
 * @providesModule InfoModal
 */

'use strict';

import React, { PropTypes } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableWithoutFeedback
} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class InfoModal extends React.Component {
    static propTypes = {
        message: PropTypes.string
    }

    static defaultProps = {
        message: 'Test message!'
    }

    constructor(props) {
        super(props);
    }

    closeModal() {
        Actions.pop();
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={this.closeModal}>
                <View style={styles.container}>
                    <View style={styles.contentContainer}>
                        <Text style={styles.text}>{this.props.message}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top:0,
        bottom:0,
        left:0,
        right:0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)'
    },
    contentContainer: {
        backgroundColor: 'white',
        margin: 50,
        paddingTop: 50,
        paddingBottom: 50,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 5
    },
    text: {
        color: 'black'
    }
});
