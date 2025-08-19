import './App.css';
import React from 'react';
import SearchForm from './SearchForm';
import THeader from './THeader';
import User from './User';
import Footer from './Footer';
import { searchQueryParams } from './seachParams';
import { useState, useEffect } from 'react';

const buildQueryString = () => {
  const params = searchQueryParams;
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
  const [filterConfig, setFilterConfig] = useState({ category: null, searchText: null });
  const usersPerPage = 10;

  const fetchData = async (page) => {
    const skip = (page - 1) * usersPerPage;
    
    const createQueryString = (baseUrl) => {
      const params = [];

      if (filterConfig.category !== null && filterConfig.searchText !== null) {
        params.push(`/filter?key=${encodeURIComponent(filterConfig.category)}&value=${encodeURIComponent(filterConfig.searchText)}`)
      }
      
      if (sortConfig.key !== null) {
        params.push(`sortBy=${encodeURIComponent(sortConfig.key)}`);
        if (sortConfig.order !== null) {
          params.push(`order=${encodeURIComponent(sortConfig.order)}`);
        }
      }
      params.push(`?limit=${usersPerPage}`);
      params.push(`skip=${skip}`);
      params.push(`select=${buildQueryString()}`);

      const queryString = baseUrl + params.join('&');
      return queryString;
    }

    try {
      const url = createQueryString('https://dummyjson.com/users');
      console.log(url);
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
  }, [currentPage, sortConfig, filterConfig]);

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

  const handleFilterChange = ({ category, searchText}) => {
    setFilterConfig({ category, searchText });
  }

  const renderTableBody = () => (
    <tbody>
      {users.map(user => <User key={user.id} user={user} />)}
    </tbody>
  )

  return (
    <>
      <SearchForm
        onFilterChange={handleFilterChange}
      />
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