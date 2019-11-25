import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
      marginTop: theme.spacing(6),
    },
  },
  root: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  title: {
    paddingTop: theme.spacing(3),
  },
  content: {
    paddingTop: theme.spacing(2),
  },
  chip: {
    marginLeft: theme.spacing(2),
  },
}));

export default useStyles;
