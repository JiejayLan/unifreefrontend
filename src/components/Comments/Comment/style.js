import { makeStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

const useStyles = makeStyles((theme) => ({
  list: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(4),
  },
  content: {
    paddingTop: theme.spacing(3),
    color: theme.palette.common.black,
  },
  showReply: {
    color: grey[600],
    marginLeft: theme.spacing(3.5),
    marginTop: theme.spacing(-5),
    fontSize: '13px',
  },
  left: {
    display: 'block',
    float: 'left',
  },
}));

export default useStyles;
