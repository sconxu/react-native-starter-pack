/**
* @providesModule NavigationDrawer
*/

'use strict';

import React, { PropTypes } from 'react';
import Drawer from 'react-native-drawer';
import { DefaultRenderer } from 'react-native-router-flux';
import DrawerContent from 'DrawerContent';
import { Navigator } from 'react-native';

export default class NavigationDrawer extends React.Component {
    static propTypes = {
        navigationsState: PropTypes.object
    };

    constructor(props) {
        super(props);
    }

    render() {
        const children = this.props.navigationState.children;
        return (
            <Drawer
                type='overlay'
                ref='navigationDrawer'
                content={<DrawerContent />}
                tapToClose={true}
                panCloseMask={0.3}
                openDrawerOffset={0.3}
                styles={{
                    drawer: {
                        backgroundColor: 'white',
                        shadowColor: "#000000",
                        shadowOpacity: 0.1,
                        shadowRadius: 0,
                        marginTop: 20
                    }
                }}
                tweenDuration={this.tweenDuration}
                tweenHandler={(ratio) => {
                    return {
                        drawer: { shadowRadius: Math.min(ratio*5*5, 5) },
                        main: { opacity:(2-ratio)/2 },
                    }
                }}
            >
                <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
            </Drawer>
        );
    }
}
