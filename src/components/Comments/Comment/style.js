import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  list: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(4),
  },
  content: {
    paddingTop: theme.spacing(5),
    color: theme.palette.common.black,
    whiteSpace: 'normal',
    wordWrap: 'break-word',
  },
  left: {
    display: 'block',
    float: 'left',
  },
  right: {
    display: 'block',
    float: 'right',
  },
  delete_icon: {
    '& .MuiButton-iconSizeSmall': {
      margin: 0,
    },
  },
  button: {
    marginLeft: theme.spacing(8),
  },
}));

export default useStyles;
