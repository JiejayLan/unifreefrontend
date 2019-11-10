import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import PaginationComp from 'material-ui-flat-pagination';
import {
  InputLabel, MenuItem, FormControl, Select, Grid,
} from '@material-ui/core';
import useStyles from './style';
import { useStateValue } from '../StateProvider';

export const Pagination = () => {
  const classes = useStyles();
  const [{ page }, dispatch] = useStateValue();
  const { currentPage, pageSize, totalPages } = page;
  const offset = (currentPage - 1) * pageSize;
  const totalRow = totalPages * pageSize;
  const pageSizeOption = [5, 10, 20, 30];

  const handlePageChange = (offsetRow) => {
    const newCurrentPage = Math.floor(offsetRow / pageSize) + 1;
    dispatch({
      type: 'changePage',
      newPage: { currentPage: newCurrentPage },
    });
  };
  const handlePageSizeChange = (event) => {
    const newPageSize = event.target.value;
    dispatch({
      type: 'changePage',
      newPage: { pageSize: newPageSize, currentPage: 1 },
    });
  };

  return (
    <>
      <CssBaseline />
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <PaginationComp
            className={classes.pagination}
            limit={pageSize}
            offset={offset}
            total={totalRow}
            onClick={(e, offsetRow) => handlePageChange(offsetRow)}
            size="large"
          />
        </Grid>
        <Grid item xs={4}>
          <FormControl className={classes.formControl}>
            <InputLabel className={classes.formTitle} id="pageSize-input">Per Page</InputLabel>
            <Select
              id="pageSize-dropdown"
              value={pageSize}
              onChange={handlePageSizeChange}
            >
              { pageSizeOption.map((size) => <MenuItem value={size}>{size}</MenuItem>) }
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
};
