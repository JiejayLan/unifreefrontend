import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  content: {
    paddingTop: 15,
  },
  chip: {
    align: 'right',
    marginLeft: theme.spacing(2),
  },
}));

export default useStyles;
