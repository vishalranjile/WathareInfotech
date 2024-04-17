// src/App.js

import React from 'react';
import MachineDataForm from './Components/MachineDataForm';
import MachineDataTable from './Components/MachineDataTable';
import MachineDataGraph from './Components/MachineDataGraph'; // Import MachineDataGraph component

const App = () => {
  return (
    <div>
      <h1>Machine Data Management</h1>
      <MachineDataForm />
      <MachineDataTable />
      {/* <MachineDataGraph /> Include MachineDataGraph component */}
    </div>
  );
};

export default App;
