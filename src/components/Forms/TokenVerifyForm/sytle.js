import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  '@global': {
    input: {
      '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
        '-moz-appearance': 'none',
        margin: 0,
      },
      '&[type=number]': {
        '-webkit-appearance': 'textfield',
        '-moz-appearance': 'textfield',
      },
    },
  },
});

export default useStyles;
