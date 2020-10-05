import React, { useMemo } from "react";
import { Pagination as PaginationBootstrap } from "react-bootstrap";
import { Link } from "react-router-dom";

const Pagination = ({ current, max }) => {
  const arrayOfPages = useMemo(() => {
    const arr = [];

    for (let i = 1; i <= max; i++) {
      arr.push(i);
    }
    return arr;
  }, [max]);

  const mappedPages = useMemo(() => {
    return arrayOfPages
      .filter((page) => {
        return (
          page < parseInt(current, 10) + 2 && page > parseInt(current, 10) - 2
        );
      })
      .map((page) => {
        return (
          <Link to={page !== current ? `?page=${page}` : null}>
            <li
              className={`page-link  ${
                page === parseInt(current, 10) ? "bg-primary text-light" : ""
              }`}
            >
              {page}
            </li>
          </Link>
        );
      });
  }, [arrayOfPages, current]);

  return (
    <PaginationBootstrap className="d-flex align-items-center justify-content-center">
      <Link to={current !== 1 ? `?page=1` : null}>
        <li className="page-link">&laquo;</li>
      </Link>

      {mappedPages.length < max && current > 3 && (
        <>
          {" "}
          <Link to={`?page=1`}>
            <li className="page-link">1</li>
          </Link>
          <PaginationBootstrap.Ellipsis />
        </>
      )}
      {mappedPages}
      {mappedPages.length < max && current < max - 2 && (
        <>
          {" "}
          <PaginationBootstrap.Ellipsis />
          <Link to={`?page=${max}`}>
            <li className="page-link">{max}</li>
          </Link>
        </>
      )}
      <Link to={current !== max ? `?page=${max}` : null}>
        <li className="page-link">&raquo;</li>
      </Link>
    </PaginationBootstrap>
  );
};

export default Pagination;
