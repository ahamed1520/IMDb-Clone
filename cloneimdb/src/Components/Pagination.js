import React, { useCallback } from "react";
import usePagination, { DOTS } from "./usePagination";

const Pagination = ({ onPageChange, currPage, totalPages, siblings = 1 }) => {
  // console.log("Pagination");
  const paginationRange = usePagination({
    totalPages,
    siblings,
    currPage,
  });

  /**
   * ! Loading the Previous page
   */
  const loadPrevious = useCallback(() => {
    if (currPage > 1) {
      onPageChange(currPage - 1);
    }
  }, [currPage, onPageChange]);
  /**
   * ! Loading the Next page
   */
  const loadNext = useCallback(() => {
    onPageChange(currPage + 1);
  }, [currPage, onPageChange]);
  return (
    <ul className="flex justify-center gap-2  text-white">
      <li
        className={
          currPage === 1 ? "pointer-events-none" : "pointer-events-auto"
        }
      >
        <button
          onClick={loadPrevious}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 font-medium"
        >
          Prev
        </button>
      </li>

      {paginationRange?.map((pageNumber, idx) => {
        if (pageNumber === DOTS) {
          return (
            <li key={idx} className="m-2">
              &#8230;
            </li>
          );
        }
        return (
          <li
            className={
              pageNumber === currPage
                ? "cursor-pointer  bg-slate-300 px-2 m-2 rounded-3xl text-black"
                : " cursor-pointer m-2 "
            }
            onClick={() => {
              if (pageNumber > 500) {
                pageNumber = 500;
              }
              onPageChange(pageNumber);
            }}
            key={idx}
          >
            {pageNumber}
          </li>
        );
      })}

      <li
        className={
          currPage === 500 ? "pointer-events-none " : "pointer-events-auto "
        }
      >
        <button
          onClick={loadNext}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 font-medium"
        >
          Next
        </button>
      </li>
    </ul>
  );
};

export default React.memo(Pagination);
