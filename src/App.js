import { AdminPortal } from './AdminPortal';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DataContextProvider } from './context/DataContext';
function App() {
  return (
      <DataContextProvider>
      <ToastContainer />
        <AdminPortal />
      </DataContextProvider>  
  );
}

export default App;
