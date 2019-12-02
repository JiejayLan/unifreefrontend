import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  deleteBtn: {
    color: '#fff',
    backgroundColor: '#f44336',
    '&:hover': {
      backgroundColor: '#e57373',
    },
  },
}));

export default useStyles;
