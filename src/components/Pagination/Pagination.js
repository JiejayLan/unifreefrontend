import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Pagin from 'material-ui-flat-pagination';
import { useStateValue } from '../StateProvider';

const theme = createMuiTheme();

export const Pagination = () => {
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
      <Pagin
        limit={pageSize}
        offset={offset}
        total={totalRow}
        onClick={(e, offsetRow) => handleClick(offsetRow)}
      />
    </MuiThemeProvider>
  );
};
