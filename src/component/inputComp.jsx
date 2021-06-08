import React, {useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container:{
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      padding: "0 10px"
  },
  root: {
    display: "inline-block",
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function InputComp(props) {
  const classes = useStyles();
  const textFieldRef = useRef();
  const { search } = props;

  const handleSearch = () => {
      const searchWord = textFieldRef.current.value.trim();
      search(searchWord)
  }

  return (
    <div className={classes.container}>
        <form className={classes.root} noValidate autoComplete="off">
        <TextField id="outlined-basic" label="name" variant="outlined" inputRef={textFieldRef} />
        </form>
        <Button variant="contained" color="primary" disableElevation onClick={handleSearch}>搜尋</Button>
    </div>
  );
}