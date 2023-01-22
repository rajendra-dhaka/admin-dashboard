import { Button, Paper, Skeleton, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";
import { useData } from "../../context/DataContext";
import './Table.scss';

export const Table = () => {
  const { onSelectAllRow,onSelectRow,onEditUser,onDelete, selectedAllRows, currentData, selectedRows } = useData();
  return (
    <table>
      <thead>
        <tr>
          <th>
            <input type='checkbox' onChange={onSelectAllRow} checked={selectedAllRows} />
          </th>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {currentData.length > 0
          ? currentData?.map((user, index) => (
              <tr key={index} style={selectedRows.includes(user.id) ? { backgroundColor: 'rgb(215, 229, 244)' } : {}}>
                <td>
                  <input
                    type='checkbox'
                    onChange={() => onSelectRow(user.id)}
                    checked={selectedRows.includes(user.id)}
                  />
                </td>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td className='cta'>
                  <Button onClick={() => onDelete(user.id)} variant='contained'>
                    Delete
                  </Button>
                  <Button onClick={() => onEditUser(user)} variant='outlined'>
                    Edit
                  </Button>
                </td>
              </tr>
            ))
          : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
              <tr>
                <td>
                  <Skeleton variant='text' animation='wave' height={35} />
                </td>
                <td>
                  <Skeleton variant='text' animation='wave' height={35} />
                </td>
                <td>
                  <Skeleton variant='text' animation='wave' height={35} />
                </td>
                <td>
                  <Skeleton variant='text' animation='wave' height={35} />
                </td>
                <td>
                  <Skeleton variant='text' animation='wave' height={35} />
                </td>
                <td>
                  <Skeleton variant='text' animation='wave' height={35} />
                </td>
              </tr>
            ))}
      </tbody>
    </table>
    // <TableContainer component={Paper}>
    //   <Table sx={{ minWidth: 650 }} aria-label='simple table'>
    //     <TableHead>
    //       <TableRow>
    //         <TableCell>
    //           <input type='checkbox' onChange={props.handleSelectAll} checked={props.selectedAll} />
    //         </TableCell>
    //         <TableCell>ID</TableCell>
    //         <TableCell align='right'>Name</TableCell>
    //         <TableCell align='right'>Email</TableCell>
    //         <TableCell align='right'>Role</TableCell>
    //         <TableCell align='right'>Actions</TableCell>
    //       </TableRow>
    //     </TableHead>

    //     <TableBody>
    //       {props?.currentData?.length > 0 ? props?.currentData?.map((user,index) => (
    //         <TableRow key={index}
    //           sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    //          style={props.selectedRows.includes(user.id) ? { backgroundColor: 'rgb(215, 229, 244)' } : {}}
    //         >
    //           <TableCell component='th' scope='row'>
    //                     <input
    //                 type='checkbox'
    //                 onChange={() => props.handleRowSelect(user.id)}
    //                 checked={props.selectedRows.includes(user.id)}
    //               />
    //           </TableCell>
    //           <TableCell align='right'>{user.id}</TableCell>
    //           <TableCell align='right'>{user.name}</TableCell>
    //           <TableCell align='right'>{user.email}</TableCell>
    //           <TableCell align='right'>{user.role}</TableCell>
    //           <TableCell align='right' className="cta">
    //                            <Button onClick={() => props.handleDelete(user.id)} variant='contained'>
    //                 Delete
    //               </Button>
    //               <Button onClick={() => props.handleEdit(user)} variant='outlined'>
    //                 Edit
    //                </Button>
    //           </TableCell>
    //         </TableRow>
    //       ))   : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
    //           <TableRow key={item}>
    //             <TableCell>
    //               <Skeleton variant='text' animation='wave' height={35} />
    //             </TableCell>
    //             <TableCell>
    //               <Skeleton variant='text' animation='wave' height={35} />
    //             </TableCell>
    //             <TableCell>
    //               <Skeleton variant='text' animation='wave' height={35} />
    //             </TableCell>
    //             <TableCell>
    //               <Skeleton variant='text' animation='wave' height={35} />
    //             </TableCell>
    //             <TableCell>
    //               <Skeleton variant='text' animation='wave' height={35} />
    //             </TableCell>
    //             <TableCell>
    //               <Skeleton variant='text' animation='wave' height={35} />
    //             </TableCell>
    //           </TableRow>))
    //     }
    //     </TableBody>
    //   </Table>
    // </TableContainer>
  );
};
