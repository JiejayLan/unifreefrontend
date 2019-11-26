import { makeStyles } from '@material-ui/core/styles';

export const useStyle = makeStyles((theme) => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  title: {
    borderBottom: '2px solid #000',
  },
  input: {
    marginLeft: -28,
  },
  button: {
    marginTop: theme.spacing(1),
    marginLeft: -28,
  },
}));
