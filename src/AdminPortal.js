import React from 'react';
import Pagination from 'react-pagination-js';
import 'react-pagination-js/dist/styles.css'; // import css
import { Button, Card, CardActions, CardContent, Modal, Typography } from '@mui/material';
import { Navbar, Table, UpsertForm } from './components';
import './AdminPortal.scss';
import { useData } from './context/DataContext';

export const AdminPortal = () => {
  const {
    onMultipleDeletes,
    onModalClose,
    onPageChange,
    setShowModal,
    setRowsPerPage,
    filteredData,
    selectedRows,
    showModal,
    rowsPerPage,
    currentPage,
  } = useData();

  return (
    <div className='admin-portal-home'>
      {/* Below code is for Navbar built manually using CSS */}
      <Navbar />
      {/* Below code is for card showing Data in table using Material UI */}
      <Card className='main-card'>
        <Typography className='title'>Your Personalized Admin Dashboard</Typography>
        <CardContent>
          <Table />
        </CardContent>
        <CardActions>
          <Button onClick={onMultipleDeletes} disabled={!selectedRows.length} color='primary'>
            Delete Selected
          </Button>
          <Button onClick={() => setShowModal(true)} color='primary'>
            Add User
          </Button>
          <select name='rowsPerPage' id='cars' value={rowsPerPage} onChange={(e) => setRowsPerPage(e.target.value)}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </CardActions>
      </Card>
      {/* Below code is for Pagination using react-pagination-js Library */}
      <div className='pagination'>
        <Pagination
          currentPage={currentPage}
          totalSize={filteredData.length}
          sizePerPage={rowsPerPage}
          changeCurrentPage={onPageChange}
        />
      </div>
      {/* Below code is for Modal using Material ui library */}
      <Modal
        className='modal'
        open={showModal}
        onClose={onModalClose}
        aria-labelledby='parent-modal-title'
        aria-describedby='parent-modal-description'>
        <UpsertForm />
      </Modal>
    </div>
  );
};
