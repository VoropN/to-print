export const charactersPerPage = 1000;

export const getCurrentPosition = ({
  position,
  activePage,
}: {
  position: number;
  activePage: number;
}) => position - activePage * charactersPerPage;

export const getCurrentPage = ({ position }: { position: number }) =>
  (position / charactersPerPage) >> 0;

export const getPageText = ({
  fullText,
  currentPage,
}: {
  fullText: string;
  currentPage: number;
}) => {
  const start = currentPage * charactersPerPage;
  const end = start + charactersPerPage;
  return fullText.slice(start, end);
};
