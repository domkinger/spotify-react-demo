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
  function handleClick(e) {
    props.remove(props.artist);
    e.preventDefault();
  }

  return (
    <div>
      <ListItem>
        <ListItemAvatar>
          <Avatar src={props.artist.images[2].url}/>
        </ListItemAvatar>
        <ListItemText
          primary={props.artist.name}
          secondary={props.artist.genres[0]}
        />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="delete" onClick={handleClick}>
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </div>
  );
}