// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { Line } from 'react-chartjs-2';

// const MachineDataGraph = () => {
//   const [machineData, setMachineData] = useState([]);
//   const chartRef = useRef(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/getdata');
//         const formattedData = response.data.map(item => ({
//           ...item,
//           ts: parseTimestamp(item.ts), // Parse timestamp into Date object
//         }));
//         setMachineData(formattedData);
//       } catch (error) {
//         console.error('Error fetching machine data:', error);
//       }
//     };
//     fetchData();
//   }, []);
  
//   // Function to parse timestamp string into Date object
// //   const parseTimestamp = (timestampString) => {
// //     // Example: "1/21/2024, 8:30:00 PM"
// //     const [datePart, timePart] = timestampString.split(', '); // Split date and time
// //     const [month, day, year] = datePart.split('/').map(Number); // Extract month, day, year
// //     const [time, period] = timePart.split(' '); // Extract time and period (AM/PM)
// //     let [hour, minute, second] = time.split(':').map(Number); // Extract hour, minute, second
  
// //     // Adjust hour for 12-hour format (convert to 24-hour format if PM)
// //     if (period === 'PM' && hour !== 12) {
// //       hour += 12;
// //     } else if (period === 'AM' && hour === 12) {
// //       hour = 0; // Midnight (12 AM) is 0 hour
// //     }
// const parseTimestamp = (timestampString) => {
//     return new Date(timestampString);
//   };
  
//   // Example usage:
//   const timestampString = "2024-04-17T06:54";
//   const parsedDate = parseTimestamp(timestampString);
//   console.log(parsedDate); // Output: 2024-04-17T06:54:00.000Z (JavaScript Date object)
  
  
//     // Create Date object (month is 0-indexed in JavaScript Date)
//     return new Date(year, month - 1, day, hour, minute, second);
//   };
  
  

//   const chartData = {
//     labels: machineData.map(data => data.ts), // Array of Date objects
//     datasets: [
//       {
//         label: 'Machine Status',
//         data: machineData.map(data => ({
//           x: data.ts,
//           y: data.machine_status,
//         })),
//         borderColor: 'blue',
//       },
//     ],
//   };
  
  





//   const chartOptions = {
//     scales: {
//       x: {
//         type: 'time', // Use 'time' scale for x-axis
//         time: {
//           unit: 'hour', // Display time axis in hourly intervals
//           displayFormats: {
//             hour: 'MMM D, hA', // Format for displaying hour-level timestamps
//           },
//         },
//       },
//       y: {
//         min: 0,
//         max: 1,
//         ticks: {
//           stepSize: 1,
//         },
//       },
//     },
//     plugins: {
//       legend: {
//         display: true,
//         position: 'top',
//       },
//     },
//   };
  
  

  
//   return (
//     <div>
//       <h2>Machine Data Graph</h2>
//       <Line ref={chartRef} data={chartData} options={chartOptions} />
//     </div>
//   );
// }
// ;

// export default MachineDataGraph;


import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js';
import 'chartjs-adapter-date-fns'; // Import date adapter

const MachineDataGraph = () => {
  const [machineData, setMachineData] = useState([]);
  const chartRef = useRef(null);

  // Function to parse timestamp string into Date object
  const parseTimestamp = (timestampString) => {
    return new Date(timestampString);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/getdata');
        const formattedData = response.data.map(item => ({
          ...item,
          ts: parseTimestamp(item.ts), // Parse timestamp into Date object
        }));
        setMachineData(formattedData);
      } catch (error) {
        console.error('Error fetching machine data:', error);
      }
    };
    fetchData();
  }, []);

  const chartData = {
    labels: machineData.map(data => data.ts), // Array of Date objects
    datasets: [
      {
        label: 'Machine Status',
        data: machineData.map(data => ({
          x: data.ts,
          y: data.machine_status,
        })),
        borderColor: 'blue',
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        type: 'time', // Use 'time' scale for x-axis
        time: {
          unit: 'hour', // Display time axis in hourly intervals
          displayFormats: {
            hour: 'MMM D, hA', // Format for displaying hour-level timestamps
          },
        },
      },
      y: {
        min: 0,
        max: 1,
        ticks: {
          stepSize: 1,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  return (
    <div>
      <h2>Machine Data Graph</h2>
      <Line ref={chartRef} data={chartData} options={chartOptions} />
    </div>
  );
};

export default MachineDataGraph;
