import React, {useEffect, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classNames from "classnames/bind";
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Paper } from '@material-ui/core';
import { fetchAllData, fetchSearchData } from "../api/index";
import SimpleDialog from "./dialog.jsx";
import InputComp from "./inputComp.jsx"


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const columns = [
    { name: 'name' },
    { name: 'flag' },
    { name: 'alpha2Code' },
    { name: 'alpha3Code' },
    { name: 'nativeName' },
    { name: 'altSpellings' },
    { name: 'callingCodes' },
  ];

function EnhancedTableHead(props) {
  const { classes,  order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.name}
            // padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === column.name ? order : false}
          >
            <TableSortLabel
              active={orderBy === column.name}
              direction={orderBy === column.name ? order : 'asc'}
              onClick={createSortHandler(column.name)}
            >
              {column.name}
              {orderBy === column.name ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  container: {
    height: "600px"
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  img:{
      width: "30px"
  }
}));


export default function EnhancedTable() {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);
  const [search, setSearch] = React.useState("");
  const [data, setData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [currentData, setCurrentData] = React.useState({});
  const tableContainerRef = useRef();

  useEffect(() => {
    const fetchData = async () => {
      const getData = search === "" 
      ? await fetchAllData()
      : await fetchSearchData(search);
      setPage(0);
      setData(getData.data);
    };

    fetchData();
  }, [search]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    tableContainerRef.current.scrollTop = 0;
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <InputComp search={setSearch} />
      <Paper className={classes.paper}>
        <TableContainer className={classes.container} ref={tableContainerRef}>
          <Table
            className={classes.table}
            stickyHeader
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {stableSort(data, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.name} onClick={()=>{setCurrentData(row);handleDialogOpen();}}>
                        {columns.map((column) => {
                            return (
                                <TableCell key={column.name} align={column.align}>
                                {column.name === "flag" 
                                ? <img src={row.flag} alt={`${column.name}-flag`} className={classes.img} /> 
                                : Array.isArray(row[column.name])
                                    ? row[column.name].join("、")
                                    : row[column.name]}
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
          rowsPerPageOptions={[25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      {open && <SimpleDialog data={currentData} open={open} onClose={handleDialogClose}/>}
    </div>
  );
}
