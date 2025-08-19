import './App.css';
import React from 'react';
import User from './User';
import Footer from './Footer'
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
  const usersPerPage = 10;

  const fetchData = async (page) => {
    const skip = (page - 1) * usersPerPage;
    try {
      const response = await fetch(`https://dummyjson.com/users?limit=${usersPerPage}&skip=${skip}&select=${buildQueryString()}`);
      const result = await response.json();
      setUsers(result.users);
      setTotalUsers(result.total);
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderTableBody = () => (
      <tbody>
        {users.map(user => <User key={user.id} user={user} />)}
      </tbody>
    )


  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Фамилия</th>
            <th>Имя</th>
            <th>Отчество</th>
            <th>Возраст</th>
            <th>Пол</th>
            <th>Номер телефона</th>
            <th>Email</th>
            <th>Cтрана</th>
            <th>Город</th>
          </tr>
        </thead>
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