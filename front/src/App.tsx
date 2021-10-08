import React from 'react';
import './App.css';
import {observer} from 'mobx-react';
import Login from '@pages/Login';
import {
    AppBar,
    Box,
    CssBaseline,
    Drawer,
    IconButton,
    Toolbar,
    Typography
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {MenuDrawer} from '@components/MenuDrawer';
import {mainMenuItems, mainRoute} from './mainMenu';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import {appRoutes} from '@src/routing';
import {useStore} from '@store/stores';

const App = () => {

    const { isAuthorized } = useStore();

    if (!isAuthorized) {
        return <Login/>;
    }

    const container = window !== undefined ? () => window.document.body : undefined;
    const drawerWidth = 240;
    const mobileOpen = false;

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar
                position="fixed"
                sx={{
                    width: {sm: `calc(100% - ${drawerWidth}px)`},
                    ml: {sm: `${drawerWidth}px`},
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        sx={{mr: 2, display: {sm: 'none'}}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Каталог Товаров
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}}}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: {xs: 'block', sm: 'none'},
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                    }}
                >
                    {MenuDrawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: {xs: 'none', sm: 'block'},
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                    }}
                    open
                >
                    {MenuDrawer}
                </Drawer>
            </Box>
            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                <Toolbar/>
                <Switch>
                    <Redirect exact from="/" to={mainRoute}/>
                    {mainMenuItems.map(route => (
                        <Route key={route.pathPattern} path={route.pathPattern} component={route.component}/>
                    ))}
                    {appRoutes.map(r => (
                        <Route key={r.pathPattern} path={r.pathPattern} component={r.component}/>
                    ))};
                </Switch>
            </Box>
        </Box>
    );
}

export default withRouter(observer(App));
