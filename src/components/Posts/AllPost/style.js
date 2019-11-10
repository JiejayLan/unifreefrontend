import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  loader: {
    alignItems: 'center',
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    width: '100vw',
  },
  loaderImg: {
    height: '6rem',
    width: '6rem',
  }
}));

export default useStyles;
