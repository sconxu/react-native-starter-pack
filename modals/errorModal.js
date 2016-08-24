/**
 * @providesModule ErrorModal
 */

'use strict';

import React, { PropTypes } from 'react';
import {
    Text,
    TouchableWithoutFeedback,
    StyleSheet,
    View
} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class ErrorModal extends React.Component {
    static propTypes = {
        data: PropTypes.string
    }

    constructor(props) {
        super(props);

        this.closeModal = this.closeModal.bind(this);
    }

    closeModal() {
        Actions.pop();
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={this.closeModal}>
                <View style={styles.container}>
                    <Text style={{fontSize: 20}}>
                        {this.props.data}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top:0,
        bottom:0,
        left:0,
        right:0,
        backgroundColor: 'crimson',
        justifyContent: "center",
        alignItems: "center"
    }
});
