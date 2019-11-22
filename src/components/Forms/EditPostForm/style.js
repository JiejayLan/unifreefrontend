import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  editBtn: {
    color: '#fff',
    backgroundColor: '#3f51b5',
    '&:hover': {
      backgroundColor: '#7986cb',
    },
  },
}));

export default useStyles;
