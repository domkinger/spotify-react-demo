import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import DeleteIcon from '@material-ui/icons/Delete';

export default function ArgumentListItem(props) {

  return (
    <div>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <LibraryMusicIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={props.value}
          secondary={props.type}
        />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </div>
  );
}