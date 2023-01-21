import React, { useEffect, useState } from 'react';
import Pagination from 'react-pagination-js';
import {Button, Card, CardActions, CardContent, Modal, Typography } from '@mui/material';
import { Navbar, Table, UpsertForm } from './components';
import './AdminPortal.scss';

export const AdminPortal = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const [editingUser, setEditingUser] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedAll, setSelectedAll] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10); // 10 rows per page

  useEffect(() => {
    fetch(`https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setFilteredData(data);
      });
  }, []);

  //..... function to handle SEARCH.....
  const handleFilter = (e) => {
    const searchTerm = e.target.value.trim().toLowerCase();
    setFilteredData(
      data.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm) ||
          user.email.toLowerCase().includes(searchTerm) ||
          user.role.toLowerCase().includes(searchTerm)
      )
    );
  };

  //.....function to handle ADD user.....
  const handleAddUser = (newUser) => {
    setData([...data, newUser]);
    setFilteredData([...filteredData, newUser]);
    setShowModal(false);
  };

  //.....function to handle EDIT user......
  const handleEdit = (user) => {
    setEditingUser(user);
    setShowModal(true);
  };

  //.....function to handle UPDATE....
  const handleUpdateUser = (updatedUser) => {
    setData(data.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
    setFilteredData(filteredData.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
    setEditingUser(null);
    setShowModal(false);
  };

  //.......function to handle ROW SELECTION........
  const handleRowSelect = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  //........function to handle ALL ROW SELECTION.........
  const handleSelectAll = () => {
    if (selectedAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(currentData.map((user) => user.id));
    }
    setSelectedAll(!selectedAll);
  };

  //......function to handle delete
  const handleDelete = (id) => {
    setData(data.filter((row) => row.id !== id));
    setFilteredData(filteredData.filter((row) => row.id !== id));
    setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
  };

  // function to handle multiple deletes
  const handleMultipleDeletes = () => {
    setData(data.filter((row) => !selectedRows.includes(row.id)));
    setFilteredData(filteredData.filter((row) => !selectedRows.includes(row.id)));
    setSelectedRows([]);
    setSelectedAll(false);
  };

  // function to handle close modal
  const handleCloseModal = () => {
    setEditingUser(null);
    setShowModal(false);
  };

  // handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // get current data
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentData = filteredData.slice(indexOfFirstRow, indexOfLastRow);
  return (
    <div className='admin-portal-home'>
      <Navbar handleFilter={handleFilter} />
      
      <Card className='main-card'>
        <Typography className='title'>Your Personalized Admin Dashboard</Typography>
        <CardContent>
          <Table handleSelectAll={handleSelectAll} selectedAll={selectedAll} currentData={currentData} selectedRows={selectedRows} handleRowSelect={handleRowSelect} handleDelete={handleDelete} handleEdit={handleEdit} />
        </CardContent>
        <CardActions>
          <Button onClick={handleMultipleDeletes} disabled={!selectedRows.length} color='primary'>
            Delete Selected
          </Button>
          <Button onClick={() => setShowModal(true)} color='primary'>
            Add User
          </Button>
          <select name='rowsPerPage' id='cars' onChange={(e) => setRowsPerPage(e.target.value)}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </CardActions>
      </Card>

      <div className='pagination'>
        <Pagination
          currentPage={currentPage}
          totalSize={filteredData.length}
          sizePerPage={rowsPerPage}
          changeCurrentPage={handlePageChange}
        />
      </div>

      <Modal
        className='modal'
        open={showModal}
        onClose={handleCloseModal}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'>
        <UpsertForm
          user={editingUser}
          onSave={editingUser === null ? handleAddUser : handleUpdateUser}
          onClose={handleCloseModal}
        />
      </Modal>
    </div>
  );
};
