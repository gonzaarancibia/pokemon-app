import React from 'react';

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  hasNextPage,
  hasPreviousPage,
}) {
  const handlePrevious = () => {
    if (hasPreviousPage) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (hasNextPage) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    onPageChange(page);
  };

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    // Adjust start page if we're near the end
    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div
      className="pagination"
      style={{
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '20px 0',
      }}
    >
      <button
        onClick={handlePrevious}
        disabled={!hasPreviousPage}
        style={{
          padding: '8px 16px',
          cursor: hasPreviousPage ? 'pointer' : 'not-allowed',
          opacity: hasPreviousPage ? 1 : 0.5,
        }}
      >
        Previous
      </button>

      {getPageNumbers().map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => handlePageClick(pageNumber)}
          style={{
            padding: '8px 12px',
            backgroundColor: currentPage === pageNumber ? '#007bff' : '#f8f9fa',
            color: currentPage === pageNumber ? 'white' : '#000',
            border: '1px solid #ddd',
            cursor: 'pointer',
          }}
        >
          {pageNumber}
        </button>
      ))}

      <button
        onClick={handleNext}
        disabled={!hasNextPage}
        style={{
          padding: '8px 16px',
          cursor: hasNextPage ? 'pointer' : 'not-allowed',
          opacity: hasNextPage ? 1 : 0.5,
        }}
      >
        Next
      </button>

      <span style={{ marginLeft: '10px', fontSize: '14px' }}>
        Page {currentPage} of {totalPages}
      </span>
    </div>
  );
}
