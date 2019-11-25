import { makeStyles } from '@material-ui/core/styles';

export const useStyle = makeStyles((theme) => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  input: {
    backgroundColor: '#f3f3f3',
    paddingLeft: '1%',
    paddingRight: '1%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    minHeight: 50,
  },
  button: {
    marginTop: theme.spacing(1),
  },
}));
