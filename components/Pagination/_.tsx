import { Dispatch, memo, SetStateAction } from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";

export interface IPagination {
  fullText: string;
  setText: Dispatch<SetStateAction<string>>;
  activePage: number;
  setActivePage: Dispatch<SetStateAction<number>>;
}

const Pagination = ({
  setText,
  fullText,
  activePage,
  setActivePage,
}: IPagination) => {
  return (
    <div className={styles.pagination}>
      {Array.from({ length: (1 + fullText.length / 1000) >> 0 }, (_, i) => (
        <div
          key={i}
          onClick={() => {
            setText(fullText.slice(i * 1000, i * 1000 + 1000));
            setActivePage(i);
          }}
          className={classNames(styles.paginationItem, {
            [styles.paginationActiveItem]: i === activePage,
          })}
        >
          {i}
        </div>
      ))}
    </div>
  );
};

export default memo(Pagination);