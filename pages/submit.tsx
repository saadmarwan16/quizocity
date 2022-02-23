import { NextPage } from "next";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Submit: NextPage = () => {
  const createData = (
    name: number,
    isAnswered: boolean,
    answer: string,
  ) => {
    return { name, isAnswered, answer };
  };

  const rows = [
    createData(1, true, 'Government'),
    createData(2, false, 'School'),
    createData(3, false, 'Government'),
    createData(4, true, 'Worship'),
    createData(5, true, 'Government'),
    createData(6, false, 'Government'),
    createData(7, false, 'School'),
    createData(8, true, 'Government'),
    createData(9, true, 'Worship'),
    createData(10, true, 'Government'),
  ];

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Question Number</TableCell>
            <TableCell>Answered</TableCell>
            <TableCell>Answer</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>{row.isAnswered ? 'YES' : 'NO'}</TableCell>
              <TableCell>{row.answer}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Submit;
