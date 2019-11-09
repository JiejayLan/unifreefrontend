import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import PaginationComp from 'material-ui-flat-pagination';
import { useStateValue } from '../StateProvider';
import useStyles from './style';

const theme = createMuiTheme();


export const Pagination = () => {
  const classes = useStyles();
  const [{ page }, dispatch] = useStateValue();
  const { currentPage, pageSize, totalPages } = page;
  const offset = (currentPage - 1) * pageSize;
  const totalRow = totalPages * pageSize;

  const handleClick = (offsetRow) => {
    const newCurrentPage = Math.floor(offsetRow / pageSize) + 1;
    dispatch({
      type: 'changePage',
      newPage: { currentPage: newCurrentPage },
    });
  };
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <PaginationComp
        className={classes.pagination}
        limit={pageSize}
        offset={offset}
        total={totalRow}
        onClick={(e, offsetRow) => handleClick(offsetRow)}
        size="large"
      />
    </MuiThemeProvider>
  );
};
