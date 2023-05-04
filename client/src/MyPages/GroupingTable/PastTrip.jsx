import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from 'react-router-dom';
import styles from './PastTrip.module.css';

const columns = [
  { id: 'status', label: '상태', minWidth: 120 },
  { id: 'name', label: '여행\u00a0상품명', minWidth: 160 },
  {
    id: 'date',
    label: '기간',
    minWidth: 210,
  },  
  {
    id: 'review',
    label: '리뷰',
    minWidth: 250,
  },
];

function createData(status, name, date, review) {
  return { status, name, date, review };
}

const rows = [
  createData('완료', '자연찾아 전라도', "2023-01-15 ~ 2023-01-17", "리뷰 남기기"),
  createData('완료', '춘천 1박 2일', "2023-01-15 ~ 2023-01-17", "리뷰 남기기"),
  createData('완료', '강릉 데이투어', "2023-01-15 ~ 2023-01-17", "리뷰 남기기"),
  createData('완료', '여기서 쉬어가요 여행 (ver. 강원도)', "2023-01-15 ~ 2023-01-17", "리뷰 남기기"),
];

export default function PastTrip() {
  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const navigate = useNavigate();

  const handleClickReview = React.useCallback((name) => {
    navigate(`/review/${name}`);
  }, [navigate]);
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === 'review' ? <button 
                          onClick={()=>handleClickReview(row.name)}
                          style={{ borderRadius: '4px', border: 'none', boxShadow: '0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12)'}}
                          className={styles.reviewBtn}>리뷰 남기기</button> : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 15, 20]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}