import React from 'react';
import './App.css';
import {
    AppBar,
    CssBaseline,
    Toolbar,
    Typography, withStyles
} from "@material-ui/core";

import { appStyles } from './appStyles';
import {observer} from 'mobx-react';
import {injectRootStore, RootStoreInjected} from '@store/RootStore';
import Login from '@pages/Login';

@injectRootStore
@observer
class App extends React.Component<RootStoreInjected> {

    render() {
        const classes: any = appStyles;
        const { isAuthorized } = this.props.rootStore;

        if (!isAuthorized) {
            return (
                <React.Fragment>
                    <Login />
                </React.Fragment>
            );
        }

        return (
            <React.Fragment>
                <CssBaseline/>
                <AppBar position="absolute" color="default" className={classes.appBar}>
                    <Toolbar>
                        <Typography variant="h6" color="inherit" noWrap>
                            Velvetech Test
                        </Typography>
                    </Toolbar>
                </AppBar>
                <main className={classes.layout}>

                </main>
            </React.Fragment>
        )
    }
}

export default withStyles(appStyles)(App);
