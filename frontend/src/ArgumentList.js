import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ArgumentListItem from './ArgumentListItem.js'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        maxWidth: 752,
        color: 'grey'
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        margin: theme.spacing(4, 0, 2),
    },
}));

export default function ArgumentList(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.demo}>
                <List>
                {props.artists.map(artist => <ArgumentListItem value={artist} type="Artist" key={Math.random()}/>)}
                </List>
            </div>
        </div>
    );
}