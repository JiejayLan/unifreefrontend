import { makeStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

export const useStyle = makeStyles((theme) => ({
  replyButton: {
    color: grey[600],
    marginLeft: theme.spacing(3.5),
    marginTop: theme.spacing(-5),
    fontSize: '13px',
  },
  button: {
    float: 'right',
    marginTop: theme.spacing(1),
  },
  avatar: {
    width: 25,
    height: 25,
  },
  grid: {
    marginLeft: theme.spacing(4),
  },
}));
