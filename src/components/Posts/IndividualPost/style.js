import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  title: {
    paddingTop: theme.spacing(3),
  },
  content: {
    paddingTop: theme.spacing(2),
  },
  chip: {
    align: 'right',
    marginLeft: theme.spacing(2),
  },
}));

export default useStyles;
