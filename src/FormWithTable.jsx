import React, { useState } from "react";

const FormWithTable = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [records, setRecords] = useState([]);

  const validate = () => {
    let newErrors = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters long";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const emailExists = records.some(
        (record) => record.email === formData.email
      );
      if (emailExists) {
        alert("Email already exists in the table!");
        return;
      }
      setRecords([...records, formData]);
      setFormData({ name: "", email: "", password: "" }); // Reset form
      setErrors({});
    }
  };

  return (
    <div style={{ width: "400px", margin: "20px auto", textAlign: "center" }}>
      <h2>Form with Table</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
          <p style={{ color: "red" }}>{errors.name}</p>
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <p style={{ color: "red" }}>{errors.email}</p>
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <p style={{ color: "red" }}>{errors.password}</p>
        </div>
        <button type="submit">Submit</button>
      </form>

      {records.length > 0 && (
        <table
          border="1"
          style={{ width: "100%", marginTop: "20px", textAlign: "left" }}
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr key={index}>
                <td>{record.name}</td>
                <td>{record.email}</td>
                <td>{record.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FormWithTable;
