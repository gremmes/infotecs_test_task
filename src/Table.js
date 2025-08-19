import './App.css';
import React from 'react';
import THeader from './THeader';
import User from './User';
import Footer from './Footer';
import { searchParams } from './seachParams';
import { useState, useEffect } from 'react';

const buildQueryString = () => {
  const params = searchParams;
  const query = Object.values(params)
    .map((value) => `${encodeURIComponent(value)}`)
    .join(',');
  return query;
};

const Table = () => {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, order: null});
  const usersPerPage = 10;

  const fetchData = async (page) => {
    const skip = (page - 1) * usersPerPage;
    
    const createQueryString = (baseUrl) => {
      const params = [];
      
      if (sortConfig.key !== null) {
        params.push(`sortBy=${encodeURIComponent(sortConfig.key)}`);
        if (sortConfig.order !== null) {
          params.push(`order=${encodeURIComponent(sortConfig.order)}`);
        }
      }
      params.push(`limit=${usersPerPage}`);
      params.push(`skip=${skip}`);
      params.push(`select=${buildQueryString()}`);

      const queryString = baseUrl + params.join('&');
      return queryString;
    }

    try {
      const url = createQueryString('https://dummyjson.com/users?')
      const response = await fetch(url);
      const result = await response.json();
      setUsers(result.users);
      setTotalUsers(result.total);
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, sortConfig]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSorting = (headerKey) => {
    setSortConfig(prev => {
      if (prev.key !== headerKey) {
        return { key: headerKey, order: 'asc' };
      } else {
        if (prev.order === 'asc') {
          return { key: headerKey, order: 'desc' };
        } else if (prev.order === 'desc') {
          return { key: null, order: null };
        }
      }
    });
  }

  const renderTableBody = () => (
    <tbody>
      {users.map(user => <User key={user.id} user={user} />)}
    </tbody>
  )

  return (
    <>
      <table>
        <THeader
          onClick={handleSorting}
          sortRules={sortConfig}
        />
        {renderTableBody()}
      </table>
      <Footer
        totalUsers={totalUsers}
        usersPerPage={usersPerPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Table;