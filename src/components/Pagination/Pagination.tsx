import React from "react";
import "./pagination.scss";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Pagination = ({
  currentPage,
  usersPerPage,
  totalUsers,
  paginate,
}) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalUsers / usersPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        <li className="page-item">
          <button
            onClick={() => currentPage > 1 && paginate(currentPage - 1)}
            className="page-link"
            disabled={currentPage <= 1}>
            <ChevronLeft size={20} color="#000000" />
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={
              number === currentPage ? "page-item active" : "page-item"
            }>
            <button onClick={() => paginate(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
        <li className="page-item">
          <button
            onClick={() =>
              currentPage < totalPages && paginate(currentPage + 1)
            }
            className="page-link"
            disabled={currentPage >= totalPages}>
            <ChevronRight size={20} color="#000000" />
          </button>
        </li>
      </ul>
    </nav>
  );
};
