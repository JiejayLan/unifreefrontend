import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  pagination: {
    textAlign: 'right',
    paddingTop: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 100,
  },
  formTitle: {
    fontSize: '20px',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default useStyles;
