import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Pagin from 'material-ui-flat-pagination';
import { useStateValue } from '../StateProvider';

const theme = createMuiTheme();
export const Pagination = () => {
  const [{ page }, dispatch] = useStateValue();

  // eslint-disable-next-line no-unused-vars
  const handleClick = (offset) => {
    dispatch({
      type: 'changePage',
      newPage: { currentPage: page.currentPage + 1 },
    });
  };

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Pagin
        limit={page.pageSize}
        offset={(page.currentPage - 1) * page.pageSize}
        total={page.totalPages * page.pageSize}
        onClick={(e, offset) => handleClick(offset)}
      />
    </MuiThemeProvider>
  );
};
