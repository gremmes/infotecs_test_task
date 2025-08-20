import '../css/Footer.css';
import React from 'react';
import { useState, useEffect } from 'react';

const Footer = ({ totalUsers, usersPerPage, onPageChange }) => {
  const maxNumPages = Math.ceil(totalUsers / usersPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    if (maxNumPages === 0) {
      setPages([]);
    } else if (maxNumPages <= 3) {
      setPages(Array.from({ length: maxNumPages }, (_, i) => i + 1));
    } else {
      let startPage = Math.max(1, currentPage - 1);
      let endPage = Math.min(maxNumPages, currentPage + 1);

      if (currentPage === 1) {
        endPage = 3;
      } else if (currentPage === maxNumPages) {
        startPage = maxNumPages - 2;
      }

      setPages(Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i));
    }
  }, [maxNumPages, currentPage]);

  const handlePageClick = (page) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  const handleFirst = () => {
    setCurrentPage(1);
    onPageChange(1);
  };

  const handleLast = () => {
    const lastPage = Math.ceil(totalUsers / usersPerPage);
    setCurrentPage(lastPage);
    onPageChange(lastPage);
  };

  return (
    <footer>
      <button onClick={handleFirst}>В НАЧАЛО</button>
      {pages.map(page => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </button>
      ))}
      <button onClick={handleLast}>В КОНЕЦ</button>
    </footer>
  );
}

export default Footer;