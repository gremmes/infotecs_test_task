import './App.css';
import React from 'react';
import User from './User';
import { useState, useEffect } from 'react';

const Table = () => {
  const [users, setUsers] = useState([]);

  const renderTableBody = () => {
    if (users.length === 0) return null;

    return (
      <tbody>
        {users.map(user => <User key={user.id} user={user} />)}
      </tbody>
    )
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dummyjson.com/users');
        const result = await response.json();
        setUsers(result.users);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);


  return (
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
  );
};

export default Table;