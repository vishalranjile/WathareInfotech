// src/components/MachineDataTable.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MachineDataTable = () => {
  const [machineData, setMachineData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/getdata');
        setMachineData(response.data);
      } catch (error) {
        console.error('Error fetching machine data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Machine Data</h2>
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Status</th>
            <th>Vibration</th>
          </tr>
        </thead>
        <tbody>
          {machineData.map((data, index) => (
            <tr key={index}>
              <td>{new Date(data.ts).toLocaleString()}</td>
              <td>{data.machine_status}</td>
              <td>{data.vibration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MachineDataTable;
