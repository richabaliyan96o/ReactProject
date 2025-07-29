import React, { useState } from "react";
import "./Employee.css"; 

const Employee = () => {
  const [employee, setEmployee] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addDetails = () => {
    if (!form.name || !form.email || !form.phone || !form.address) {
      alert("Please fill all fields");
      return;
    }
    if (editIndex !== null) {
      const updated = [...employee];
      updated[editIndex] = form;
      setEmployee(updated);
      setEditIndex(null);
    } else {
      setEmployee([...employee, form]);
    }
    setForm({
      name: "",
      email: "",
      phone: "",
      address: "",
    });
  };

  const delteEmployee = (index) => {
    const updatedEmployee = employee.filter((emp, i) => i !== index);
    setEmployee(updatedEmployee);
  };

  const editemployee = (index) => {
    setForm(employee[index]);
    setEditIndex(index);
  };

  return (
    <div className="container">
      <h4>Employee Management System</h4>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={form.name}
        onChange={handleChange}
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Phone"
        name="phone"
        value={form.phone}
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="Address"
        name="address"
        value={form.address}
        onChange={handleChange}
      />
      <button onClick={addDetails}>
        {" "}
        {editIndex !== null ? "Update" : "Add"}
      </button>
      <div>
        <h2>Employee List</h2>
        {/* show in table */}
        <table border="1">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {employee.map((emp, index) => (
              <tr key={index}>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.phone}</td>
                <td>{emp.address}</td>
                <button onClick={() => editemployee(index)}>edit</button>
                <button onClick={() => delteEmployee(index)}>delete</button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employee;
