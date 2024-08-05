import { useMemo } from "react";

const range = (start, end) => {
  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
};
export const DOTS = "...";
const usePagination = ({ totalPages, siblings, currPage }) => {
  const ranges = useMemo(() => {
    const totalPageCount = Math.ceil(totalPages / 2);
    const leftSiblings = Math.max(currPage - siblings, 1);
    const rightSiblings = Math.min(currPage + siblings, totalPageCount);

    const showLeftDots = leftSiblings > 2;
    const showRightDots = rightSiblings < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!showLeftDots && showRightDots) {
      const leftRange = range(1, 5 * siblings);
      return [...leftRange, DOTS, totalPageCount];
    }

    if (showLeftDots && !showRightDots) {
      const rightRange = range(
        totalPageCount - 5 * siblings + 1,
        totalPageCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (showLeftDots && showRightDots) {
      const middleRange = range(leftSiblings, rightSiblings);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalPages, siblings, currPage]);
  return ranges;
};

export default usePagination;
