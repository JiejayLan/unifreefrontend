import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  list: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(4),
  },
  commentHeader: {
    marginTop: theme.spacing(5),
  },
  content: {
    paddingTop: theme.spacing(3),
    color: theme.palette.common.black,
  },
  left: {
    display: 'block',
    float: 'left',
  },
  right: {
    display: 'block',
    float: 'right',
  },
}));

export default useStyles;
