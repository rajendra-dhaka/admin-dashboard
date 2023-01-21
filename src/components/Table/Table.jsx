import { Button } from "@mui/material";
import React from "react";

export const Table = (props) => {
  return (
    <table>
      <thead>
        <tr>
          <th>
            <input type='checkbox' onChange={props.handleSelectAll} checked={props.selectedAll} />
          </th>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {props?.currentData?.map((user, index) => (
          <tr key={index} style={props.selectedRows.includes(user.id) ? { backgroundColor: 'rgb(215, 229, 244)' } : {}}>
            <td>
              <input
                type='checkbox'
                onChange={() => props.handleRowSelect(user.id)}
                checked={props.selectedRows.includes(user.id)}
              />
            </td>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td className='cta'>
              <Button onClick={() => props.handleDelete(user.id)} variant='contained'>
                Delete
              </Button>
              <Button onClick={() => props.handleEdit(user)} variant='outlined'>
                Edit
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
