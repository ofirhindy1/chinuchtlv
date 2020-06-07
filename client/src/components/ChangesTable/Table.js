import React ,{useContext}from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Context from "../Context";


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  table:{
    direction:"rtl",
height:550,
width:500
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(from, to, amount) {
  return { from, to, amount};
}



const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables() {
  const { change } = useContext(
    Context
  );
  if(change){
    change.map(details=>console.log(details))
  }
  const rows = [
    createData(),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
  
  ];
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="right">מוסד שולח (סוג)</StyledTableCell>
            <StyledTableCell align="right">מוסד מקבל (סוג)</StyledTableCell>
            <StyledTableCell align="right">כמות</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {change?change.map((details) => (
            <StyledTableRow key={details.from}>

              <StyledTableCell align="right">{`${details.from}(${details.fromType})`}</StyledTableCell>
              <StyledTableCell align="right">{`${details.to}(${details.toType})`}</StyledTableCell>
              <StyledTableCell align="right">{details.students}</StyledTableCell>
            </StyledTableRow>
          )):"אין העברות להציג"}
        </TableBody>
      </Table>
    </TableContainer>
  );
}