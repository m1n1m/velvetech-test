import {Divider, List, ListItem, ListItemIcon, ListItemText, Toolbar} from '@mui/material';
import {mainMenuIcons, mainMenuItems} from '../mainMenu';
import React from 'react';
import { NavLink } from 'react-router-dom';

export const MenuDrawer = (
    <div>
        <Toolbar />
        <Divider />
        <List>
            {mainMenuItems.map((item, index) => {
                    const Icon = mainMenuIcons[item.icon];
                    return (
                        <NavLink to={item.menuLink} className="Nav_link" key={item.menuLink}>
                            <ListItem button key={item.caption}>
                                <ListItemIcon>
                                    <Icon/>
                                </ListItemIcon>
                                <ListItemText primary={item.caption}/>
                            </ListItem>
                        </NavLink>
                )
                })}
        </List>
    </div>
);
