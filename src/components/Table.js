import '../../src/App.css';
import '../css/Modal.css';
import React from 'react';
import SearchForm from './SearchForm';
import THeader from './THeader';
import User from './User';
import Footer from './Footer';
import Modal from './Modal';
import { searchQueryParams } from '../consts/seachParams';
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
  const [sortConfig, setSortConfig] = useState({ key: null, order: null });
  const [filterConfig, setFilterConfig] = useState({ category: null, searchText: null });
  const [modal, setModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const usersPerPage = 10;

  const fetchData = async (page) => {
    const skip = (page - 1) * usersPerPage;

    const createQueryString = (baseUrl) => {
      const params = [];

      if (filterConfig.category !== null && filterConfig.searchText !== null) {
        params.push(`/filter?key=${encodeURIComponent(filterConfig.category)}&value=${encodeURIComponent(filterConfig.searchText)}`)
      } else {
        params.push('?');
      }

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
      const url = createQueryString('https://dummyjson.com/users');
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Ошибка сети: ${response.status} ${response.statusText}`);
      }
      const result = await response.json();
      setUsers(result.users);
      setTotalUsers(result.total);
    } catch (err) {
      setError(err.message);
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
  };

  const handleFilterChange = ({ category, searchText }) => {
    if (searchText === '') {
      setFilterConfig({ category: null, searchText: null });
    } else {
      setFilterConfig({ category, searchText });
    }
  };

  const toggle = async (id) => {
    if (modal === false) {
      try {
        const getUser = async (userId) => {
          const response = await fetch(`https://dummyjson.com/users/${userId}`);
          if (!response.ok) {
            throw new Error(`Ошибка сети при получения пользователя: ${response.status} ${response.statusText}`);
          }
          const result = await response.json();
          return result;
        };
        const userData = await getUser(id);
        setUserData(userData);
      } catch (err) {
        setError(err.message);
      }
    }
    setModal(!modal);
  };

  const renderTableBody = () => (
    <tbody>
      {users.map(user => <User key={user.id} user={user} toggle={toggle} />)}
    </tbody>
  );

  return (
    <>
      {error && <div className="error-message">{error}</div>}
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
      <Modal isOpen={modal}>
        <Modal.Header toggle={toggle}>Информация о пользователе:</Modal.Header>
        <Modal.Body user={userData} />
        <Modal.Footer>
          <button
            type="button"
            className="modal-close-button btn btn-secondary"
            onClick={toggle}
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Table;