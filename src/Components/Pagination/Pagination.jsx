import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';

const Pagination = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
        const fetchedData = await response.json();
        setData(fetchedData);
      } catch (error) {
        alert("Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <div className="container mx-auto mt-8">
      <h1>Employee Data Table</h1>
      <table className="table-auto border w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Role</th>
            {/* Add more table headers based on your data */}
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <tr key={item.id}>
              <td className="border px-4 py-2">{item.id}</td>
              <td className="border px-4 py-2">{item.name}</td>
              <td className="border px-4 py-2">{item.email}</td>
              <td className="border px-4 py-2">{item.role}</td>
              {/* Render additional table data based on your data */}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-4">
        <button
          onClick={handlePreviousPage}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
            currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Previous
        </button>
        <span className="text-gray-700">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={handleNextPage}
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
            currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
