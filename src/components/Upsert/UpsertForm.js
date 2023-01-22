import { Button, Card } from "@mui/material";
import { useState } from "react";
import { useData } from "../../context/DataContext";
import './UpsertForm.scss';

export const UpsertForm = ({  onSave }) => {
  const { userData, editingUser,onModalClose,onAddUser,onUpdateUser } = useData();
  
  const [formData, setFormData] = useState({
    id: +userData.at(-1).id + 1 ,
    name: '',
    email: '',
    role: 'member',
     ...editingUser ,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }


  return (
   <Card className='form-card'>
      <h2>Edit User</h2>
      <form>
        <label>
          Id:
          <input type="number" name="id" value={formData.id} onChange={handleChange} />
        </label>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <label>
          Role:
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="member">Member</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <div className="cta">
        <Button variant="contained" onClick={() => editingUser === null ? onAddUser(formData):onUpdateUser(formData)}>Save</Button>
        <Button variant="outlined" onClick={onModalClose}>Cancel</Button>
        </div>
        </form>
        </Card>
  )
}