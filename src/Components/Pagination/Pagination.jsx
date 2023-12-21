import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Pagination = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
      );
      setData(response.data);
    } catch (error) {
      alert('Failed to fetch data');
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (currentPage < Math.ceil(data.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <table className="w-full border-collapse border rounded my-4">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="py-2 px-4">ID</th>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Role</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id} className="hover:bg-gray-100">
              <td className="py-2 px-4">{item.id}</td>
              <td className="py-2 px-4">{item.name}</td>
              <td className="py-2 px-4">{item.email}</td>
              <td className="py-2 px-4">{item.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center items-center mt-4">
        <button
          className={`bg-blue-500 text-white px-4 py-2 rounded ${
            currentPage === 1 && 'opacity-50 cursor-not-allowed'
          }`}
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          &lt; Prev
        </button>
        <span className="text-lg font-bold mx-4">{currentPage}</span>
        <button
          className={`bg-blue-500 text-white px-4 py-2 rounded ${
            currentPage === Math.ceil(data.length / itemsPerPage) && 'opacity-50 cursor-not-allowed'
          }`}
          onClick={nextPage}
          disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
        >
          Next &gt;
        </button>
      </div>
    </div>
  );
};

export default Pagination;
