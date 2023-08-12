import React from "react";

interface Props {
  currentPage: number;
  totalPages: number;
  onNextPage: () => void;
  onPrevPage: () => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onNextPage,
  onPrevPage,
}: Partial<Props>) => {
  return (
    <div className="flex justify-between my-4 w-full px-10 py-2 items-center">
      <div>Current Page: {currentPage}</div>
      <div className="flex gap-4">
        <button
          className={`${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-700"
          } text-white font-bold py-2 px-4 rounded-l`}
          onClick={onPrevPage}
          disabled={currentPage === 1}
        >
          <span className="material-icons">arrow_back</span>
        </button>
        <button
          className={`${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-700"
          } text-white font-bold py-2 px-4 rounded-l`}
          onClick={onNextPage}
        >
          <span className="material-icons">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
