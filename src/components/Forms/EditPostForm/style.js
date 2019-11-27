import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  editBtn: {
    color: '#fff',
    backgroundColor: '#3f51b5',
    '&:hover': {
      backgroundColor: '#7986cb',
    },
    marginRight: theme.spacing(2),
  },
}));

export default useStyles;
