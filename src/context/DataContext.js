import { useContext, useEffect, useState } from 'react';
import { createContext } from 'react';
import { Toast } from '../components';

const DataContext = createContext({
  userData: [],
  filteredData: [],
  currentData: [],
  selectedRows: [],
  showModal: false,
  selectedAllRows: false,
  editingUser: null,
  rowsPerPage: null,
  currentPage: null,
  onFilterUser: (e) => {},
  onAddUser: (obj) => {},
  onEditUser: (obj) => {},
  onUpdateUser: (obj) => {},
  onSelectRow: (id) => {},
  onSelectAllRow: () => {},
  onDelete: (id) => {},
  onMultipleDeletes: () => {},
  onModalClose: () => {},
  onPageChange: () => {},
  setRowsPerPage: () => {},
  setShowModal: () => {},
});

const DataContextProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const [editingUser, setEditingUser] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedAll, setSelectedAll] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10); // 10 rows per page

  useEffect(() => {
    setTimeout(() => {
      if (!localStorage.getItem('userdata')) {
        fetch(`https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`)
          .then((res) => res.json())
          .then((data) => {
            setData(data);
            setFilteredData(data);
            localStorage.setItem('userdata', JSON.stringify(data));
          });
      } else {
        setData(JSON.parse(localStorage.getItem('userdata')));
        setFilteredData(JSON.parse(localStorage.getItem('userdata')));
      }
    }, 1000);
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
    if (data.filter((user) => user.id === newUser.id).length > 0) {
      Toast(`Sorry user with Id: ${newUser.id} exists! `, 'error');
      return;
    }
    const newData = [...data, newUser].sort(function (a, b) {
      return (a.id - b.id);
    });
    setData(newData);
    setFilteredData(newData);
    localStorage.setItem('userdata', JSON.stringify(newData));
    Toast('User added Successfully!');
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
    localStorage.setItem(
      'userdata',
      JSON.stringify(data.map((user) => (user.id === updatedUser.id ? updatedUser : user)))
    );
    setEditingUser(null);
    Toast('User updated Successfully!');
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
    localStorage.setItem('userdata', JSON.stringify(data.filter((row) => row.id !== id)));
    setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    Toast('User deleted Successfully!');
  };

  // function to handle multiple deletes
  const handleMultipleDeletes = () => {
    setData(data.filter((row) => !selectedRows.includes(row.id)));
    setFilteredData(filteredData.filter((row) => !selectedRows.includes(row.id)));
    localStorage.setItem('userdata', JSON.stringify(data.filter((row) => !selectedRows.includes(row.id))));
    setSelectedRows([]);
    setSelectedAll(false);
    Toast('Users deleted Successfully!');
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

  const context = {
    userData: data,
    filteredData: filteredData,
    currentData: currentData,
    selectedRows: selectedRows,
    showModal: showModal,
    selectedAllRows: selectedAll,
    editingUser: editingUser,
    rowsPerPage: rowsPerPage,
    currentPage: currentPage,
    onFilterUser: handleFilter,
    onAddUser: handleAddUser,
    onEditUser: handleEdit,
    onUpdateUser: handleUpdateUser,
    onSelectRow: handleRowSelect,
    onSelectAllRow: handleSelectAll,
    onDelete: handleDelete,
    onMultipleDeletes: handleMultipleDeletes,
    onModalClose: handleCloseModal,
    onPageChange: handlePageChange,
    setRowsPerPage: setRowsPerPage,
    setShowModal: setShowModal,
  };

  return <DataContext.Provider value={context}>{children}</DataContext.Provider>;
};

const useData = () => useContext(DataContext);

export { useData, DataContextProvider };
