import { makeStyles, Theme } from '@material-ui/core/styles';

  export const useTableStyles = makeStyles((theme) => {
    return {
        root: {
            width: '100%',
        },
        container: {
            maxHeight: 440,
        },   
    };
  });