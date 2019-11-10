import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
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
