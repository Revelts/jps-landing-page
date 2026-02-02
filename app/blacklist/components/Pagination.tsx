/**
 * Pagination Component
 * Single Responsibility: Handle pagination UI and navigation
 * Mobile-first with touch-friendly buttons
 */

'use client';

import { Text } from '@/components/ui/Text';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
}: PaginationProps) {
  // Calculate displayed range
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= 7) {
      // Show all pages if 7 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      // Show pages around current page
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
      {/* Info Text */}
      <Text size="sm" color="secondary" className="text-text-secondary">
        Menampilkan <span className="font-semibold text-text-primary">{startItem}</span> -{' '}
        <span className="font-semibold text-text-primary">{endItem}</span> dari{' '}
        <span className="font-semibold text-secondary">{totalItems}</span> data
      </Text>

      {/* Pagination Controls */}
      <div className="flex items-center space-x-2">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`
            px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 min-h-[44px] min-w-[44px]
            ${
              currentPage === 1
                ? 'bg-surface/30 text-text-muted cursor-not-allowed border border-secondary/10'
                : 'bg-surface/50 text-text-primary border border-secondary/30 hover:bg-secondary/10 hover:border-secondary hover:text-secondary'
            }
          `}
          aria-label="Previous page"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Page Numbers */}
        <div className="hidden sm:flex items-center space-x-1">
          {pageNumbers.map((page, index) => {
            if (page === '...') {
              return (
                <span key={`ellipsis-${index}`} className="px-3 py-2 text-text-muted">
                  ...
                </span>
              );
            }

            const pageNum = page as number;
            const isActive = pageNum === currentPage;

            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`
                  min-w-[44px] min-h-[44px] px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300
                  ${
                    isActive
                      ? 'bg-gradient-to-r from-secondary to-accent text-bg-primary shadow-glow'
                      : 'bg-surface/50 text-text-primary border border-secondary/30 hover:bg-secondary/10 hover:border-secondary hover:text-secondary'
                  }
                `}
                aria-label={`Page ${pageNum}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        {/* Mobile: Current Page Display */}
        <div className="flex sm:hidden items-center px-4 py-2 bg-surface/50 backdrop-blur-sm rounded-lg border border-secondary/20">
          <Text size="sm" className="font-medium text-text-primary">
            {currentPage} / {totalPages}
          </Text>
        </div>

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`
            px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 min-h-[44px] min-w-[44px]
            ${
              currentPage === totalPages
                ? 'bg-surface/30 text-text-muted cursor-not-allowed border border-secondary/10'
                : 'bg-surface/50 text-text-primary border border-secondary/30 hover:bg-secondary/10 hover:border-secondary hover:text-secondary'
            }
          `}
          aria-label="Next page"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
