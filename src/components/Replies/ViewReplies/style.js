import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  reply: {
    width: 'calc(100% - 48px)',
    marginLeft: theme.spacing(6),
    background: '#f6f7fa',
    border: '1px solid',
    borderColor: '#eff1f5',
    borderBottom: 0,
  },
  left: {
    display: 'block',
    float: 'left',
  },
  right: {
    display: 'block',
    float: 'right',
  },
  content: {
    paddingTop: theme.spacing(3),
  },
}));

export default useStyles;
