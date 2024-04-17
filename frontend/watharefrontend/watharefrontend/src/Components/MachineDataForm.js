// src/components/MachineDataForm.js

import React, { useState } from 'react';
import axios from 'axios';

const MachineDataForm = () => {
  const [data, setData] = useState({ ts: '', machine_status: '', vibration: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/data', data);
      alert('Machine data submitted successfully!');
      setData({ ts: '', machine_status: '', vibration: '' });
    } catch (error) {
      console.error('Error submitting machine data:', error);
      alert('Failed to submit machine data. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <div>
      <h2>Submit Machine Data</h2>
      <form onSubmit={handleSubmit}>
        <input type="datetime-local" name="ts" value={data.ts} onChange={handleChange} required />
        <input type="number" name="machine_status" value={data.machine_status} onChange={handleChange} placeholder="Machine Status (0 or 1)" required />
        <input type="number" name="vibration" value={data.vibration} onChange={handleChange} placeholder="Vibration Value" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MachineDataForm;
